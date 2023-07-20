// tracing.js
'use strict';
require('dotenv').config();

const { HoneycombSDK } = require('@honeycombio/opentelemetry-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { PrismaInstrumentation } = require('@prisma/instrumentation');

// uses the HONEYCOMB_API_KEY and OTEL_SERVICE_NAME environment variables
const sdk = new HoneycombSDK({
    instrumentations: [    
        //new HttpInstrumentation(),
        //new ExpressInstrumentation(),
        new PrismaInstrumentation(),
            getNodeAutoInstrumentations({
            // we recommend disabling fs autoinstrumentation since it can be noisy
            // and expensive during startup
            '@opentelemetry/instrumentation-fs': {
                enabled: false,
            },
        }),
    ],
});

sdk.start();