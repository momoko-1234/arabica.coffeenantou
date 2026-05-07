 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/script.js b/script.js
new file mode 100644
index 0000000000000000000000000000000000000000..3a27ad367097adac084fbcd517ddadbf3eb5ac2e
--- /dev/null
+++ b/script.js
@@ -0,0 +1,25 @@
+const navToggle = document.querySelector('.nav-toggle');
+const primaryNav = document.querySelector('.primary-nav');
+
+navToggle.addEventListener('click', () => {
+  const isOpen = primaryNav.classList.toggle('is-open');
+  navToggle.setAttribute('aria-expanded', String(isOpen));
+});
+
+primaryNav.querySelectorAll('a').forEach((link) => {
+  link.addEventListener('click', () => {
+    primaryNav.classList.remove('is-open');
+    navToggle.setAttribute('aria-expanded', 'false');
+  });
+});
+
+const revealObserver = new IntersectionObserver((entries) => {
+  entries.forEach((entry) => {
+    if (entry.isIntersecting) {
+      entry.target.classList.add('is-visible');
+      revealObserver.unobserve(entry.target);
+    }
+  });
+}, { threshold: 0.16 });
+
+document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
 
EOF
)
