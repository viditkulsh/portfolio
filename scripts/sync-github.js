#!/usr/bin/env node
/**
 * GitHub Project Sync Script
 * 
 * Fetches live metadata for all portfolio projects from GitHub API
 * and writes it to src/data/githubData.json.
 * 
 * Usage:
 *   node scripts/sync-github.js                # uses public API (60 req/hr)
 *   GITHUB_TOKEN=ghp_xxx node scripts/sync-github.js   # authenticated (5000 req/hr)
 * 
 * Also detects NEW public repos not yet listed in projectsData.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const GITHUB_USERNAME = 'viditkulsh';
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'githubData.json');
const TOKEN = process.env.GITHUB_TOKEN || '';

// ─── HTTP helper ───
function fetchJSON(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));

    const headers = {
      'User-Agent': 'portfolio-sync',
      'Accept': 'application/vnd.github.v3+json',
    };
    if (TOKEN) headers['Authorization'] = `token ${TOKEN}`;

    https.get(url, { headers }, (res) => {
      // Follow redirects (301, 302, 307, 308)
      if ([301, 302, 307, 308].includes(res.statusCode)) {
        const redirectUrl = res.headers.location;
        if (redirectUrl) {
          return fetchJSON(redirectUrl, redirectCount + 1).then(resolve, reject);
        }
        // GitHub API returns redirect URL in body for 301
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const body = JSON.parse(data);
            if (body.url) return fetchJSON(body.url, redirectCount + 1).then(resolve, reject);
            reject(new Error(`Redirect without location for ${url}`));
          } catch { reject(new Error(`Redirect without location for ${url}`)); }
        });
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(new Error(`JSON parse error: ${e.message}`)); }
        } else if (res.statusCode === 403) {
          reject(new Error('GitHub API rate limit exceeded. Set GITHUB_TOKEN env var for higher limits.'));
        } else {
          reject(new Error(`GitHub API ${res.statusCode}: ${data.substring(0, 200)}`));
        }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

// ─── Extract owner/repo from GitHub URL ───
function parseGitHubUrl(url) {
  if (!url || url === '#') return null;
  const match = url.match(/github\.com\/([^/]+)\/([^/#?]+)/);
  return match ? { owner: match[1], repo: match[2] } : null;
}

// ─── Fetch single repo metadata ───
async function fetchRepoData(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  try {
    const data = await fetchJSON(url);
    return {
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      language: data.language,
      stars: data.stargazers_count,
      forks: data.forks_count,
      watchers: data.watchers_count,
      openIssues: data.open_issues_count,
      topics: data.topics || [],
      homepage: data.homepage || null,
      defaultBranch: data.default_branch,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      pushedAt: data.pushed_at,
      size: data.size, // KB
      license: data.license ? data.license.spdx_id : null,
      archived: data.archived,
      disabled: data.disabled,
      url: data.html_url,
    };
  } catch (err) {
    console.warn(`  ⚠  Could not fetch ${owner}/${repo}: ${err.message}`);
    return null;
  }
}

// ─── Fetch all user repos (paginated) ───
async function fetchAllUserRepos(username) {
  const repos = [];
  let page = 1;
  while (true) {
    const url = `https://api.github.com/users/${username}/repos?per_page=100&page=${page}&sort=updated`;
    const batch = await fetchJSON(url);
    if (!batch.length) break;
    repos.push(...batch);
    if (batch.length < 100) break;
    page++;
  }
  return repos;
}

// ─── Read known project GitHub URLs from projectsData ───
function getKnownRepoSlugs() {
  // Read projectsData.js and extract githubUrl strings
  const filePath = path.join(__dirname, '..', 'src', 'data', 'sections', 'projectsData.js');
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugs = new Set();
  const regex = /githubUrl:\s*["']https:\/\/github\.com\/([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content))) {
    slugs.add(match[1].toLowerCase().replace(/\/$/, ''));
  }
  return slugs;
}

// ─── Main ───
async function main() {
  console.log('🔄 Syncing GitHub project data...\n');

  // 1. Read known repos from projectsData
  const knownSlugs = getKnownRepoSlugs();
  console.log(`📋 Found ${knownSlugs.size} projects with GitHub URLs in projectsData.js`);

  // 2. Fetch metadata for each known project
  const repoStats = {};
  for (const slug of knownSlugs) {
    const [owner, repo] = slug.split('/');
    process.stdout.write(`   Fetching ${owner}/${repo}... `);
    const data = await fetchRepoData(owner, repo);
    if (data) {
      repoStats[slug] = data;
      console.log(`✓ ★${data.stars} 🍴${data.forks} ${data.language || 'N/A'}`);
    } else {
      console.log('✗');
    }
  }

  // 3. Fetch ALL user repos to detect new ones
  console.log(`\n🔍 Scanning all repos for ${GITHUB_USERNAME}...`);
  let allRepos = [];
  try {
    allRepos = await fetchAllUserRepos(GITHUB_USERNAME);
    console.log(`   Found ${allRepos.length} total public repos`);
  } catch (err) {
    console.warn(`   ⚠  Could not fetch user repos: ${err.message}`);
  }

  const newRepos = [];
  for (const repo of allRepos) {
    const slug = `${GITHUB_USERNAME}/${repo.name}`.toLowerCase();
    if (!knownSlugs.has(slug) && !repo.fork && !repo.archived) {
      newRepos.push({
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        topics: repo.topics || [],
        homepage: repo.homepage || null,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
        url: repo.html_url,
      });
    }
  }

  // 4. Write output
  const output = {
    _generated: new Date().toISOString(),
    _note: 'Auto-generated by scripts/sync-github.js — do not edit manually',
    repos: repoStats,
    newRepos: newRepos,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`\n✅ Wrote ${OUTPUT_PATH}`);
  console.log(`   ${Object.keys(repoStats).length} existing projects synced`);

  if (newRepos.length > 0) {
    console.log(`\n🆕 ${newRepos.length} new repo(s) detected (not in projectsData):`);
    newRepos.forEach(r => console.log(`   → ${r.fullName}: ${r.description || '(no description)'}`));
    console.log('\n   Add them to src/data/sections/projectsData.js to include in your portfolio.');
  } else {
    console.log('   No new repos detected.');
  }
}

main().catch(err => {
  console.error('❌ Sync failed:', err.message);
  // Don't fail the build — write a minimal file so the app still works
  const fallback = { _generated: new Date().toISOString(), _error: err.message, repos: {}, newRepos: [] };
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(fallback, null, 2));
  console.log('   Wrote fallback githubData.json (empty) so build can proceed.');
});
