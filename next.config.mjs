/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        const originalEntry = config.entry;
        config.entry = async () => {
            const entries = await originalEntry();

            if (
                entries['main.js'] &&
                !entries['main.js'].includes('./polyfills.ts')
            ) {
                entries['main.js'].unshift('./polyfills.ts');
            }

            return entries;
        };

        return config;
    },
};

export default nextConfig;
