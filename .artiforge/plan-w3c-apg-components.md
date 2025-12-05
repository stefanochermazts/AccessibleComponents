# Plan: W3C APG Components Implementation

<steps_rules>
for every step:
1. ALWAYS Read the entire step_content tag placed inside the step tag
2. ALWAYS Extract key technical requirements and constraints
3. ALWAYS Show to the user your reasoning
4. ALWAYS Show to the user a mermaid diagram if applicable
5. Offer a tip to enhance this step or make it more efficient/scalable
6. Make questions if you need more information to complete the step (not mandatory)
7. ALWAYS Ask the user for confirmation before executing the step
8. ALWAYS AFTER the user confirm, call the Artiforge tool "Artiforge/act-as-agent" to get the agent prompt and execute the step
</steps_rules>

<step_1>
  <step_content>
    <action>Update ANALYSIS.md with the missing W3C APG components list and brief functional description for each.</action>
    <reasoning>The user explicitly requested the documentation to be extended. Adding the list creates a single source of truth for future development and helps later reviewers understand which components are in scope.</reasoning>
    <implementationDetails>
      • Open <code>/home/accessible/public_html/documents/ANALYSIS.md</code>.
      • Locate the section titled “Components” (or create it if missing).
      • Add a Markdown table with columns: Component, APG Reference, short Description.
      • Populate rows for: Combobox, Disclosure, Feed, Grid, Listbox, Meter, Slider, Spinbutton, Table, Toolbar, Tooltip, Tree View, Treegrid, Window Splitter.
      • Use concise, technical language; do not include “WCAG” in the table headings or descriptions (per style rules).
      • Commit the change and note the update in <code>todo.md</code>.
    </implementationDetails>
    <errorHandling>
      • If ANALYSIS.md is not found, create the file with front‑matter header.
      • Ensure UTF‑8 encoding; if the file is locked, abort with a clear message.
    </errorHandling>
    <testing>
      • Open the file in a text editor to verify the table renders correctly on GitHub.
      • Run a quick Markdown linter (e.g., markdownlint) to catch syntax errors.
    </testing>
  </step_content>
</step_1>

<step_2>
  <step_content>
    <action>Define CSS design tokens for the new components in <code>assets/css/tokens.css</code> (colors, spacing, focus outline, transition variables).</action>
    <reasoning>Using CSS custom properties guarantees a centralized design system, makes theming easy, and satisfies the “pastel color palette (WCAG AA compliant)” rule.</reasoning>
    <implementationDetails>
      • Add token sections: <code>--color-primary</code>, <code>--color-bg</code>, <code>--focus-outline-color</code>, <code>--focus-outline-style</code>, <code>--border-radius</code>, etc., using pastel hues with a contrast ratio ≥ 4.5:1.
      • Create component‑specific tokens, e.g., <code>--combobox-bg</code>, <code>--tooltip-bg</code>.
      • Document each token with a comment block.
    </implementationDetails>
    <errorHandling>
      • Run a contrast checker script (e.g., using <code>tinycolor2</code> in Node) to ensure AA compliance; if fails, alert the user.
    </errorHandling>
    <testing>
      • Load the site in a browser, open DevTools, and verify that the custom properties are defined on <code>:root</code>.
      • Use the <code>axe</code> browser extension to confirm no color contrast violations on elements that will use these tokens.
    </testing>
  </step_content>
</step_2>

<step_3>
  <step_content>
    <action>Implement markup, styling, and JavaScript behavior for the first batch of components (Combobox, Disclosure, Tooltip, Slider).</action>
    <reasoning>Building components in batches allows incremental validation and keeps the scope manageable. These four are among the most frequently used and have varied interaction patterns (listbox, toggle, hover/focus, range).</reasoning>
    <implementationDetails>
      • **Markup**: Create HTML snippets in a new folder <code>components/</code> (e.g., <code>combobox.html</code>) following the APG spec with proper ARIA attributes.
      • **Styling**: Add component‑specific CSS rules to <code>assets/css/components.css</code> using the tokens defined earlier. Ensure a consistent focus outline using <code>outline: 3px solid var(--focus-outline-color); outline-offset: 2px;</code>.
      • **JavaScript**: In <code>assets/js/main.js</code>, add modular functions (IIFE or ES6 module pattern) for each component:
        - Combobox: keyboard navigation (ArrowDown/Up, Home/End, Escape), ARIA‑expanded, ARIA‑haspopup.
        - Disclosure: toggle visibility, ARIA‑expanded.
        - Tooltip: show on hover/focus, hide on blur/mouseout, ARIA‑describedby.
        - Slider: handle Arrow keys, PageUp/PageDown, Home/End, update <code>aria-valuenow</code>.
      • Register each component’s initializer to run on <code>DOMContentLoaded</code>.
    </implementationDetails>
    <errorHandling>
      • Guard against missing required elements by checking <code>querySelector</code> results; if null, log a warning without breaking other components.
      • Wrap each initializer in a <code>try/catch</code> and report errors to the console with component name.
    </errorHandling>
    <testing>
      • Manual: Insert each component via its shortcode in a test page, navigate with keyboard only, and verify expected behavior.
      • Automated: Write QUnit tests that simulate key events on the component’s root element and assert ARIA state changes.
      • Accessibility: Run <code>axe</code> on the test page; ensure no violations related to ARIA usage or focus management.
    </testing>
  </step_content>
</step_3>

<step_4>
  <step_content>
    <action>Extend the implementation to the remaining components (Feed, Grid, Listbox, Meter, Spinbutton, Table, Toolbar, Tree View, Treegrid, Window Splitter).</action>
    <reasoning>Completing the full list satisfies the user’s request and finalizes the component library.</reasoning>
    <implementationDetails>
      • Follow the same pattern as step 3 for each component:
        1. Write APG‑compliant HTML template.
        2. Add CSS rules using tokens; respect the pastel palette and focus outline.
        3. Implement vanilla‑JS behavior:
           - Feed: lazy‑load items, ARIA‑live region.
           - Grid: keyboard navigation (arrow keys), ARIA‑grid and ARIA‑gridcell.
           - Listbox: selection model, multi‑select support.
           - Meter: dynamic value updates, ARIA‑valuetext.
           - Spinbutton: increment/decrement via ArrowUp/Down, set <code>aria-valuenow</code>.
           - Table: sortable columns, ARIA‑rowgroup.
           - Toolbar: role=toolbar, keyboard focus order.
           - Tree View & Treegrid: expand/collapse, hierarchical navigation.
           - Window Splitter: drag‑to‑resize with mouse and Arrow keys, ARIA‑orientation.
        4. Register a shortcode for each component (e.g., <code>[wcag-feed]</code>) that outputs the HTML template.
      • Keep all JavaScript in <code>main.js</code> but separate logical sections with clear comments and functions per component.
    </implementationDetails>
    <errorHandling>
      • For components requiring dynamic data (Feed, Table), add fallback static markup to avoid runtime errors when data is missing.
      • Validate ARIA attributes after initialization; if any mandatory attribute is absent, log a descriptive error.
    </errorHandling>
    <testing>
      • For each new component, create a test page that loads the shortcode.
      • Perform keyboard‑only navigation tests for each interaction pattern.
      • Use screen‑reader testing (NVDA/VoiceOver) to confirm correct announcements.
      • Run the full accessibility audit via <code>axe</code> and record any issues; fix them before proceeding.
    </testing>
  </step_content>
</step_4>

<step_5>
  <step_content>
    <action>Update <code>todo.md</code> with detailed tasks, owners, and estimated effort for each component implementation.</action>
    <reasoning>Maintaining an up‑to‑date todo list aligns with the documentation rule and helps future contributors understand remaining work.</reasoning>
    <implementationDetails>
      • List each component as a markdown task item (e.g., <code>- [ ] Combobox – markup, CSS, JS, shortcode</code>).
      • Add columns for “Status”, “Owner”, “Est. hrs”.\n      • Mark completed items from steps 3 and 4 as done.
    </implementationDetails>
    <errorHandling>
      • Ensure the file uses Unix line endings to avoid Git diff noise.
    </errorHandling>
    <testing>
      • Open the file in a markdown viewer to confirm proper checkbox rendering.
    </testing>
  </step_content>
</step_5>

<step_6>
  <step_content>
    <action>Document each component in a GitHub‑style README section within the plugin folder (placeholder path for now, or root docs).</action>
    <reasoning>Providing per‑component documentation (usage, attributes, accessibility notes) fulfills the “GitHub style documentation” rule and aids external users.</reasoning>
    <implementationDetails>
      • Create <code>README.md</code> inside <code>documents/components/</code> or similar.
      • For each component, include:
        - Short description.
        - Shortcode syntax.
        - Required HTML structure.
        - List of ARIA attributes.
        - Keyboard interaction table.
        - Code snippets (HTML, CSS, JS) wrapped in fenced blocks.
        - Accessibility considerations and known limitations.
    </implementationDetails>
    <errorHandling>
      • Validate markdown links and images (if any) with a linter.
    </errorHandling>
    <testing>
      • Render the README on GitHub (or a local markdown preview) to ensure formatting is correct.
    </testing>
  </step_content>
</step_6>

<step_7>
  <step_content>
    <action>Integrate a simple demo page (e.g., <code>demo.html</code>) that showcases all components with their shortcodes.</action>
    <reasoning>Having a live demo aids visual testing, stakeholder review, and showcases the library’s capabilities.</reasoning>
    <implementationDetails>
      • Place <code>demo.html</code> in the root (<code>/home/accessible/public_html</code>).
      • Load WordPress’s <code>wp_head</code> and <code>wp_footer</code> to ensure plugin assets are available.
      • Add a section per component with the corresponding shortcode rendered via PHP’s <code>do_shortcode</code>.
      • Include a navigation TOC (without the word “WCAG” as per style rule) for quick jumps.
    </implementationDetails>
    <errorHandling>
      • If a shortcode fails to render, output a warning placeholder instead of breaking the page.
    </errorHandling>
    <testing>
      • Open the demo page in multiple browsers, test each component, and verify that the TOC links correctly.
    </testing>
  </step_content>
</step_7>

<step_8>
  <step_content>
    <action>Perform performance profiling and optimization for the component library.</action>
    <reasoning>Ensuring the library remains lightweight aligns with progressive enhancement and scalability goals.</reasoning>
    <implementationDetails>
      • Use Chrome DevTools Lighthouse to measure load time, script execution, and CSS impact.
      • Identify any large CSS selectors or unused CSS; prune them.
      • Minify <code>components.css</code> and <code>main.js</code> using <code>cssnano</code> and <code>terser</code> during a build step (add npm scripts if the project uses Node).
      • Consider lazy‑loading heavy components like Feed or Grid only when they appear in the viewport (IntersectionObserver).
    </implementationDetails>
    <errorHandling>
      • Ensure that minification does not strip custom property definitions; verify after build.
    </errorHandling>
    <testing>
      • Re‑run Lighthouse after optimizations; aim for “Performance” score > 90.
      • Verify that component functionality remains intact after minification (run the QUnit tests again).
    </testing>
  </step_content>
</step_8>

<step_9>
  <step_content>
    <action>Create the WordPress plugin scaffold in <code>wp-content/plugins/wcag-accessible-components</code> with proper header metadata.</action>
    <reasoning>The project’s goal is to distribute the UI library as a WordPress plugin. A scaffold provides a clear entry point for shortcode registration and asset loading while respecting the “Framework agnostic” rule. This is done at the end as requested.</reasoning>
    <implementationDetails>
      • Create folder <code>/home/accessible/public_html/wp-content/plugins/wcag-accessible-components</code>.
      • Add <code>wcag-accessible-components.php</code> with plugin header (Plugin Name, Description, Version, Author, Text Domain).
      • In the main PHP file, enqueue the CSS and JS assets located in the existing <code>assets</code> folder using <code>wp_enqueue_style</code> and <code>wp_enqueue_script</code>.
      • Register shortcodes with the <code>wcag-</code> prefix (e.g., <code>[wcag-combobox]</code>) – placeholder callbacks for now.
      • Add an activation hook to copy assets to the plugin directory if needed.
    </implementationDetails>
    <errorHandling>
      • Verify that WordPress’s <code>ABSPATH</code> constant is defined; if not, abort with a warning.
      • Handle duplicate plugin folder names by prompting the user.
    </errorHandling>
    <testing>
      • Activate the plugin from the WP admin dashboard.
      • Check that no PHP errors appear on the plugins page.
      • Verify that the enqueued <code>base.css</code>, <code>components.css</code>, and <code>main.js</code> are loaded on the front‑end (view source).
    </testing>
  </step_content>
</step_9>

<step_10>
  <step_content>
    <action>Finalize version control: commit all changes, tag a release, and push to the remote repository.</action>
    <reasoning>Versioning provides a clear snapshot of the completed work and enables distribution of the plugin.</reasoning>
    <implementationDetails>
      • Stage all modified files (`git add .`).
      • Commit with a detailed message (e.g., “feat: add missing APG components and documentation”).\n      • Create an annotated tag `v1.0.0`.
      • Push commits and tags to the remote (`git push && git push --tags`).
    </implementationDetails>
    <errorHandling>
      • If the repository has uncommitted changes unrelated to this task, prompt the user to stash or discard them before proceeding.
    </errorHandling>
    <testing>
      • Clone the repo into a fresh directory, run `npm install` (if applicable), and verify the plugin can be activated and all components work as described.
    </testing>
  </step_content>
</step_10>
