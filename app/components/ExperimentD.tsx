import { InjectHtml } from "./InjectHTML";

export default function ExperimentD() {
    // simulating the page.properties.customCode payload from the platform
    const customCode = {
        header: `
            <script>
                var msg = 'Experiment D ran (Injected customCode inline script)';
                console.log('%c[D - Header] ' + msg, 'color: orange');
            </script>
        `,
        footer: `
            <p>Injected footer content
                <img src="https://static.vecteezy.com/system/resources/thumbnails/017/441/736/small/reputation-icon-thumbs-up-and-rays-customer-review-icon-quality-evaluation-feedback-isolated-illustration-vector.jpg" onerror="
                    (function () {
                        var msg = 'Experiment D ran (Injected customCode img onerror)';
                        console.log('%c[D - Footer] ' + msg, 'color: orange');
                    })()
                ">
            </p>
        `
    };

    return (
        <section>
            <h3> D. Platform-style custom-code injection </h3>
            <p> Injects author-supplied HTML via document.createElement('script') </p>
            
            <InjectHtml html={customCode.header} target="head" />
            <InjectHtml html={customCode.footer} target="body" />
        </section>
    );
}