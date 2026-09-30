import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { describe, it } from 'node:test';
import { sampleManifest } from '../src/sample-manifest.mjs';

const root = new URL('../', import.meta.url);
const path = (relative) => new URL(relative, root);

const expectedIds = {
  style: ['anime', 'illustration', 'realistic', 'manga-lineart', 'watercolor', 'oil-painting', 'simple-flat', 'pop-cute'],
  composition: ['face-closeup', 'bust-up', 'upper-body', 'full-body', 'wide-shot', 'side-view', 'low-angle', 'high-angle'],
  lighting: ['natural-light', 'bright', 'soft-light', 'sunset', 'night', 'cinematic', 'dreamy', 'dramatic']
};

const expectedHashes = {
  'style-reference.png': '20194b608bac1f01e0a11a12c0be6c56584bb4a9fc73ff2bd89b1fdc09c3dd30',
  'composition-reference.png': 'd1020f494ecf010e1481db026be76a6f83a11b10323e05099eb495d9a0fe8fb9',
  'lighting-reference.png': 'a6b2c5266c13b327024637f94d862e6cef22e80f62c12782cca78efce1e3fe06'
};

describe('Batch A Sample Manifest', () => {
  it('contains 24 unique entries with valid categories and order', () => {
    assert.equal(sampleManifest.length, 24);
    assert.equal(new Set(sampleManifest.map((entry) => entry.id)).size, 24);
    assert.deepEqual([...new Set(sampleManifest.map((entry) => entry.category))].sort(), ['composition', 'lighting', 'style']);
    assert.deepEqual(sampleManifest.map((entry) => entry.order), Array.from({ length: 24 }, (_, i) => i + 1));
    for (const entry of sampleManifest) {
      assert.ok(entry.category && entry.id && entry.label && entry.image && entry.alt);
      assert.ok(existsSync(path(entry.image)));
    }
  });

  for (const [category, ids] of Object.entries(expectedIds)) {
    it(`${category} IDs match the formal dictionary`, () => {
      assert.deepEqual(sampleManifest.filter((entry) => entry.category).filter((entry) => entry.category === category).map((entry) => entry.id), ids);
    });
  }

  it('keeps all derived assets as PNG files', () => {
    for (const entry of sampleManifest) {
      assert.match(entry.image, /\.png$/);
      assert.ok(existsSync(path(entry.image)));
    }
  });

  it('keeps the three reference hashes unchanged', () => {
    for (const [name, expected] of Object.entries(expectedHashes)) {
      const bytes = readFileSync(path(`images/samples/reference/${name}`));
      assert.equal(createHash('sha256').update(bytes).digest('hex'), expected);
    }
  });
});
