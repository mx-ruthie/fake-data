// tracing.js
'use strict';

const {dotenv} = require('dotenv');
const { HoneycombSDK } = require('@honeycombio/opentelemetry-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');

const provider = new NodeTracerProvider();
provider.register();
require('dotenv').config();

// import {fetch} from "node-fetch";

// uses the HONEYCOMB_API_KEY and OTEL_SERVICE_NAME environment variables
const sdk = new HoneycombSDK({
    instrumentations: [
        // Disable fs auto-instrumentation to avoid noise and overhead during startup
        getNodeAutoInstrumentations({
            '@opentelemetry/instrumentation-fs': {
                enabled: false,
            },
        }),

        // Register additional instrumentations
        registerInstrumentations({
            instrumentations: [
                // Express instrumentation expects HTTP layer to be instrumented
                new HttpInstrumentation(),
                new ExpressInstrumentation(),
            ],
        }),
    ],
});


sdk.start();