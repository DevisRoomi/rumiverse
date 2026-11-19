import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ARCHITECTURE_LAYERS,
  CIRCULAR_STAGES,
  ENGAGEMENT_ROADMAP,
  HERO_TELEMETRY_NODES,
  INDUSTRY_VERTICALS,
  RELIABILITY_SPECS,
  STUDIO_CONTACT,
  calculateSandboxMetrics,
  formatCounterValue,
  validateConsultationInput,
  type ConsultationFormValues,
} from './ecosystemData';

test('industry verticals, engagement roadmap, and reliability specs are complete', () => {
  assert.equal(INDUSTRY_VERTICALS.length, 3);
  assert.deepEqual(
    INDUSTRY_VERTICALS.map((v) => v.index),
    ['01', '02', '03']
  );

  assert.equal(ENGAGEMENT_ROADMAP.length, 4);
  assert.deepEqual(
    ENGAGEMENT_ROADMAP.map((p) => p.step),
    ['01', '02', '03', '04']
  );

  assert.equal(RELIABILITY_SPECS.length, 4);
  assert.deepEqual(
    RELIABILITY_SPECS.map((s) => s.title),
    [
      'End-to-End Encrypted Telemetry',
      'Modular API Architecture',
      'Edge-Fallback Offline Sync',
      '99.9% Uptime Design',
    ]
  );
});

test('authentic contact details match required principal architect and phone', () => {
  assert.equal(STUDIO_CONTACT.architectName, 'Abu Devis J.R.');
  assert.equal(STUDIO_CONTACT.email, 'abudevis5@gmail.com');
  assert.equal(STUDIO_CONTACT.phone, '+62 851-2279-7969');
  assert.equal(STUDIO_CONTACT.monogram, 'ADR // PRINCIPAL ARCHITECT');
});

test('hero telemetry HUD defines all 3 precision facility nodes', () => {
  assert.equal(HERO_TELEMETRY_NODES.length, 3);
  assert.deepEqual(
    HERO_TELEMETRY_NODES.map((n) => n.code),
    ['NODE-01', 'NODE-02', 'LOOP-03']
  );
});

test('circular ecosystem contains all four closed-loop stages in order', () => {
  assert.equal(CIRCULAR_STAGES.length, 4);
  assert.deepEqual(
    CIRCULAR_STAGES.map((stage) => stage.id),
    ['unggas-ternak', 'bio-konversi', 'hidroponik', 'filtrasi']
  );
});

test('architecture blueprint defines 3 technical layers', () => {
  assert.equal(ARCHITECTURE_LAYERS.length, 3);
  assert.deepEqual(
    ARCHITECTURE_LAYERS.map((layer) => layer.id),
    ['edge', 'backend', 'dashboard']
  );
});

test('calculateSandboxMetrics anchors defaults at 80% manual reduction, 95% waste reduction, and <30s latency', () => {
  const baseline = calculateSandboxMetrics(100, 80);
  assert.equal(baseline.manualReductionPct, 80);
  assert.equal(baseline.wasteReductionPct, 95);
  assert.ok(baseline.telemetryLatencySec < 30);
  assert.ok(baseline.waterSavedLitersPerDay > 10000);
  assert.ok(baseline.biomassConvertedKgPerMonth > 4000);

  const larger = calculateSandboxMetrics(200, 95);
  assert.ok(larger.waterSavedLitersPerDay > baseline.waterSavedLitersPerDay);
  assert.ok(larger.biomassConvertedKgPerMonth > baseline.biomassConvertedKgPerMonth);
  assert.ok(larger.manualReductionPct >= baseline.manualReductionPct);
});

test('formatCounterValue clamps bounds and eases monotonically', () => {
  assert.equal(formatCounterValue(-0.5, 95), 0);
  assert.equal(formatCounterValue(0, 95), 0);
  assert.equal(formatCounterValue(1, 95), 95);
  assert.equal(formatCounterValue(1.5, 95), 95);

  const quarter = formatCounterValue(0.25, 100);
  const half = formatCounterValue(0.5, 100);
  assert.ok(quarter > 0 && quarter < half && half < 100);
});

test('validateConsultationInput rejects empty and malformed inputs', () => {
  const invalid: ConsultationFormValues = {
    name: 'A',
    organization: '',
    email: 'bukan-email',
    phone: '123',
    focus: 'software-ai',
    notes: 'pendek',
  };

  const result = validateConsultationInput(invalid);
  assert.equal(result.valid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.organization);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.notes);
});

test('validateConsultationInput accepts valid enterprise inquiry', () => {
  const valid: ConsultationFormValues = {
    name: 'Budi Santoso',
    organization: 'PT Agro Lumajang Nusantara',
    email: 'budi@agrolumajang.co.id',
    phone: '+62 851 2279 7969',
    focus: 'integrated',
    notes: 'Kami membutuhkan integrasi sensor kandang sapi dan hidroponik dengan dasbor ERP.',
  };

  const result = validateConsultationInput(valid);
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
});
