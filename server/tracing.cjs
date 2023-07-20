// Example filename: tracing.js
'use strict';

const { HoneycombSDK } = require('@honeycombio/opentelemetry-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

const dotenv = require('dotenv');

dotenv.config();

const {SemanticResourceAttributes} = require ('@opentelemetry/semantic-conventions');
const { OTLPTraceExporter } = require ('@opentelemetry/exporter-trace-otlp-http');
const { registerInstrumentations } = require ('@opentelemetry/instrumentation');
const { SimpleSpanProcessor } = require ('@opentelemetry/sdk-trace-base');
const { NodeTracerProvider } = require ('@opentelemetry/sdk-trace-node');
const { PrismaInstrumentation } = require ('@prisma/instrumentation');
const { Resource } = require ( '@opentelemetry/resources');

// Uses environment variables named HONEYCOMB_API_KEY and OTEL_SERVICE_NAME
const sdk = new HoneycombSDK({
  instrumentations: [
    new PrismaInstrumentation(),
    getNodeAutoInstrumentations({
      // We recommend disabling fs automatic instrumentation because
      // it can be noisy and expensive during startup
      '@opentelemetry/instrumentation-fs': {
        enabled: false,
      },
  })]
});

sdk.start()
