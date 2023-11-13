const pino = require('pino');

const levelToSeverity = {
    trace: 'DEBUG',
    debug: 'DEBUG',
    info: 'INFO',
    warn: 'WARNING',
    error: 'ERROR',
    fatal: 'CRITICAL',
};

function gcpLogOptions(options, context) {
    const { mixin, serviceName, version } = context || {};

    const base = serviceName && version ? { serviceContext: { service: serviceName, version } } : {};

    return {
        // https://cloud.google.com/error-reporting/docs/formatting-error-messages#json_representation
        base,
        formatters: {
            level(label) {
                const pinoLevel = label;
                const severity = levelToSeverity[label] ?? 'INFO';
                // `@type` property tells Error Reporting to track even if there is no `stack_trace`
                const typeProp =
                    pinoLevel === 'error' || pinoLevel === 'fatal'
                        ? {
                            '@type':
                                'type.googleapis.com/google.devtools.clouderrorreporting.v1beta1.ReportedErrorEvent',
                        }
                        : {};
                return { severity, ...typeProp };
            },

            log(object) {
                const stackTrace = object.err?.stack;
                const stackProp = stackTrace ? { stack_trace: stackTrace } : {};
                return { ...object, ...stackProp };
            },
        },
        mixin,
        messageKey: 'message',
        ...options,
    };
}

module.exports = pino(gcpLogOptions());
