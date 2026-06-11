/* ============================================================
   Antoni Romera Luis — portfolio · vanilla JS, no dependencies
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Project data (edit here to update cards) ---------- */
  var GH = "https://github.com/AntoniRomera/";
  var projects = [
    {
      icon: "🤖",
      title: "ai-agents-framework",
      repo: "ai-agents-framework",
      desc: "Python multi-provider AI agent framework with modular skills and persistent memory.",
      badges: ["Python", "Gemini", "Claude", "Ollama", "Memory"],
      status: null
    },
    {
      icon: "🧭",
      title: "ai-job-aggregator",
      repo: "ai-job-aggregator",
      desc: "Playwright job collector with an LLM salary estimator and a React/Tailwind dashboard.",
      badges: ["Playwright", "React", "Tailwind", "LLM"],
      status: null
    },
    {
      icon: "🔌",
      title: "mcp-erp-server",
      repo: "mcp-erp-server",
      desc: "Model Context Protocol server exposing ERP-style demo data to AI agents.",
      badges: ["MCP", "Python", "AI agents"],
      status: null
    },
    {
      icon: "🏠",
      title: "self-hosted-ai",
      repo: "self-hosted-ai",
      desc: "Docker stack — Ollama + OpenWebUI + Tailscale — your own private ChatGPT.",
      badges: ["Docker", "Ollama", "OpenWebUI", "Tailscale"],
      status: "local"
    },
    {
      icon: "☁️",
      title: "terraform-aws-modules",
      repo: "terraform-aws-modules",
      desc: "Reusable Terraform modules for VPC, EKS and RDS — production-ready infrastructure as code.",
      badges: ["Terraform", "AWS", "VPC", "EKS", "RDS"],
      status: null
    },
    {
      icon: "📱",
      title: "openclaw-integration",
      repo: "openclaw-integration",
      desc: "Drive the AI repos from your phone via OpenClaw over Tailscale.",
      badges: ["OpenClaw", "Tailscale", "Mobile"],
      status: null
    },
    {
      icon: "🔐",
      title: "cross-stack-sso",
      repo: "cross-stack-sso",
      desc: "Single sign-on across .NET 8 (ASP.NET Core) and Java 21 (Spring Boot) via Keycloak OIDC.",
      badges: [".NET 8", "Java 21", "Spring Boot", "Keycloak", "OIDC"],
      status: "local"
    }
  ];

  var extLinkSvg =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>';
  var playSvg =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---------- Render project cards ---------- */
  function renderCards() {
    var host = document.getElementById("cards");
    if (!host) return;
    var html = projects
      .map(function (p) {
        var url = GH + p.repo;
        var tag = "";
        if (p.status === "local") {
          tag = '<span class="card-tag local">Demo · local</span>';
        }
        var badges = p.badges
          .map(function (b) {
            return '<span class="badge">' + esc(b) + "</span>";
          })
          .join("");

        var demoLink =
          p.status === "local"
            ? '<span class="card-link demo" title="Runs locally — see repo README">' +
              playSvg +
              "Live demo: local</span>"
            : "";

        return (
          '<article class="card reveal" tabindex="0">' +
          '<div class="card-top">' +
          '<span class="card-icon" aria-hidden="true">' +
          p.icon +
          "</span>" +
          tag +
          "</div>" +
          "<h3>" +
          esc(p.title) +
          "</h3>" +
          "<p>" +
          esc(p.desc) +
          "</p>" +
          '<div class="badges">' +
          badges +
          "</div>" +
          '<div class="card-links">' +
          '<a class="card-link" href="' +
          url +
          '" target="_blank" rel="noopener" aria-label="View ' +
          esc(p.title) +
          ' on GitHub">' +
          extLinkSvg +
          "Code</a>" +
          demoLink +
          "</div>" +
          "</article>"
        );
      })
      .join("");
    host.innerHTML = html;
  }

  /* ---------- Photo placeholder fallback ---------- */
  function setupPhoto() {
    var img = document.getElementById("profile-photo");
    if (!img) return;
    var frame = img.closest(".photo-frame");
    img.addEventListener("load", function () {
      // Only treat as a real photo if it actually has dimensions
      if (img.naturalWidth > 1 && frame) frame.classList.add("has-photo");
    });
    img.addEventListener("error", function () {
      // Keep the decorative placeholder background; badge stays visible.
      img.removeAttribute("src");
      img.setAttribute(
        "alt",
        "Photo placeholder — add your image at assets/profile.jpg"
      );
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function setupReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------- Card spotlight (pointer-following glow) ---------- */
  function setupSpotlight() {
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest && e.target.closest(".card");
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  }

  /* ---------- Sticky header shadow + mobile menu ---------- */
  function setupNav() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("nav-menu");

    if (header) {
      var onScroll = function () {
        header.classList.toggle("scrolled", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      menu.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          menu.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  /* ---------- Footer year ---------- */
  function setYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Init ---------- */
  function init() {
    renderCards();
    setupPhoto();
    setupReveal();
    setupSpotlight();
    setupNav();
    setYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
