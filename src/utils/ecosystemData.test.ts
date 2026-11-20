import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ENGAGEMENT_ROADMAP,
  HERO_TELEMETRY_NODES,
  INDUSTRY_VERTICALS,
  SECTOR_SIMULATOR_PROFILES,
  STUDIO_CONTACT,
  calculateSandboxMetrics,
  validateConsultationInput,
  type ConsultationFormValues,
} from './ecosystemData';

test('industry verticals and engagement roadmap are complete and numbered', () => {
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
});

test('authentic contact details match required principal architect and phone', () => {
  assert.equal(STUDIO_CONTACT.architectName, 'Abu Devis J.R.');
  assert.equal(STUDIO_CONTACT.email, 'abudevis5@gmail.com');
  assert.equal(STUDIO_CONTACT.phone, '+62 851-2279-7969');
  assert.equal(STUDIO_CONTACT.monogram, 'ADR // RUMIVERSE ARCHITECT');
});

test('hero telemetry HUD defines precision facility nodes', () => {
  assert.equal(HERO_TELEMETRY_NODES.length, 4);
  assert.deepEqual(
    HERO_TELEMETRY_NODES.map((n) => n.code),
    ['WING-01', 'WING-02', 'WING-03', 'WING-04']
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

test('SECTOR_SIMULATOR_PROFILES covers all 3 verticals with appropriate dynamic labels and details', () => {
  for (const vertical of INDUSTRY_VERTICALS) {
    const profile = SECTOR_SIMULATOR_PROFILES[vertical.id];
    assert.ok(profile, `Profile exists for ${vertical.id}`);
    assert.ok(profile.scaleLabel.length > 0);
    assert.ok(profile.scaleUnit.length > 0);
    assert.ok(profile.minScaleText.length > 0);
    assert.ok(profile.defaultScaleText.length > 0);
    assert.ok(profile.maxScaleText.length > 0);
    assert.ok(profile.metricCard2Title.length > 0);
    assert.ok(profile.metricCard1Detail.length > 0);
    assert.ok(profile.metricCard3Detail.length > 0);

    const testMetrics = calculateSandboxMetrics(100, 80);
    const detail = profile.getMetricCard2Detail(testMetrics, 100, 80);
    assert.ok(detail.length > 0);
  }

  // Check specific contextual adaptation
  assert.equal(SECTOR_SIMULATOR_PROFILES['custom-web-mobile'].scaleUnit, 'pengguna / modul');
  assert.equal(SECTOR_SIMULATOR_PROFILES['agentic-ai-workforce'].scaleUnit, 'dokumen / hari');
  assert.equal(SECTOR_SIMULATOR_PROFILES['field-iot-cps'].scaleUnit, 'titik sensor / aktuator');
  assert.ok(SECTOR_SIMULATOR_PROFILES['custom-web-mobile'].metricCard2Title.includes('OPERASIONAL'));
  assert.ok(SECTOR_SIMULATOR_PROFILES['agentic-ai-workforce'].metricCard2Title.includes('JAM KERJA'));
  assert.ok(SECTOR_SIMULATOR_PROFILES['field-iot-cps'].metricCard2Title.includes('SUMBER DAYA'));
});
