export const privacyPolicy = () => {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Drafy - Privacy Policy</title>
  <meta name="description" content="Privacy Policy for the Drafy football networking platform" />
  <style>
    :root{
      --bg:#07111f;
      --bg-soft:#0d1b2f;
      --card:rgba(10, 23, 42, 0.82);
      --card-border:rgba(148, 163, 184, 0.16);
      --muted:#9fb0c7;
      --text:#eaf1fb;
      --accent:#4dd4ac;
      --accent-2:#7cdaff;
      --danger:#ff6b6b;
      --success:#66e29f;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    }
    html,body{height:100%}
    body{
      margin:0;
      color:var(--text);
      background:
        radial-gradient(circle at top left, rgba(77, 212, 172, 0.18), transparent 30%),
        radial-gradient(circle at top right, rgba(124, 218, 255, 0.14), transparent 26%),
        linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 100%);
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
      line-height:1.5;
      padding:24px;
    }
    .wrap{max-width:1040px;margin:0 auto}
    header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:20px;flex-wrap:wrap}
    header h1{font-size:28px;line-height:1.1;margin:0;color:var(--text);letter-spacing:-0.03em}
    header p{margin:6px 0 0;color:var(--muted);font-size:14px;max-width:68ch}
    .card{background:var(--card);border:1px solid var(--card-border);border-radius:20px;padding:22px;box-shadow:0 18px 45px rgba(1, 6, 15, 0.28);backdrop-filter:blur(14px);margin-bottom:16px}
    h2{margin:0 0 12px 0;font-size:18px;color:var(--text)}
    h3{margin:8px 0;color:var(--text);font-size:14px}
    p{margin:8px 0;color:var(--text)}
    ul{margin:10px 0 10px 20px;color:var(--muted)}
    ol{margin:10px 0 10px 20px;color:var(--muted)}
    .muted{color:var(--muted);font-size:13px}
    .pill{display:inline-block;padding:7px 12px;border-radius:999px;background:rgba(77, 212, 172, 0.14);color:var(--accent);font-weight:700;font-size:12px;border:1px solid rgba(77, 212, 172, 0.18)}
    .section-grid{display:grid;grid-template-columns:1fr;gap:12px}
    @media(min-width:840px){ .section-grid{grid-template-columns:1fr 360px} }
    .summary{font-size:15px;color:var(--text)}
    .cta{display:inline-block;padding:10px 14px;border-radius:999px;background:linear-gradient(135deg, var(--accent), var(--accent-2));color:#07111f;text-decoration:none;font-weight:800}
    footer{margin-top:18px;font-size:12px;color:var(--muted);text-align:center;padding-bottom:12px}
    .subtle{font-size:13px;color:var(--muted);margin-top:6px}
    .legal-list li{margin-bottom:6px}
    .hero-grid{display:grid;grid-template-columns:1fr;gap:16px}
    @media(min-width:900px){ .hero-grid{grid-template-columns:1.3fr 0.7fr} }
    .tag-grid{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
    .mini-panel{border:1px solid var(--card-border);border-radius:16px;padding:16px;background:rgba(255,255,255,0.03)}
    .mini-panel p{margin:6px 0 0}
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <div>
        <h1>Drafy Platform</h1>
        <p class="muted">Privacy Policy for the football networking, scouting, and club management backend</p>
      </div>
      <div style="text-align:right">
        <span class="pill">Last updated: April 30, 2026</span>
        <div class="subtle">Privacy policy document</div>
      </div>
    </header>

    <section class="card hero-grid">
      <div>
        <h2>Project Overview</h2>
        <p class="summary">
          Drafy is a role-based football networking backend for players, coaches, scouts, clubs, and admins.
          It supports authentication, profile setup, location-aware discovery, job posts and applications, match
          requests, scout reports, direct messaging, notifications, file uploads, and moderation tools.
        </p>
        <div class="tag-grid">
          <span class="pill">Players</span>
          <span class="pill">Coaches</span>
          <span class="pill">Scouts</span>
          <span class="pill">Clubs</span>
          <span class="pill">Admins</span>
        </div>
      </div>
      <div class="mini-panel">
        <h3>Core data paths</h3>
        <p class="muted">Account identity, role profiles, uploads, location, messages, reports, jobs, matches, and notifications.</p>
      </div>
    </section>

    <section class="card">
      <h2>1) Information We Collect</h2>
      <ul class="legal-list">
        <li>Account data: full name, email, hashed password, Apple ID where provided, user role, and account status.</li>
        <li>Authentication data: OTP records for password reset and device push tokens used for notifications.</li>
        <li>Profile data: bio, profession, phone number, gender, date of birth, address, images, and role-specific profile fields.</li>
        <li>Role data: player, coach, scout, and club profile information such as skills, licences, club details, and preferences.</li>
        <li>Location data: latitude and longitude when users save or update location for discovery and nearby features.</li>
        <li>Marketplace data: job posts, job applications, match requests, confirmed matches, and hiring status.</li>
        <li>Communication data: rooms, messages, read states, and notification records.</li>
        <li>Support and moderation data: scout reports, admin review details, and account activity used for safety actions.</li>
        <li>Upload data: images, documents, certificates, cards, logos, galleries, and other media files sent to storage.</li>
        <li>Technical data: timestamps, request metadata, and service logs used to operate and secure the backend.</li>
      </ul>
      <p class="muted">
        Files are stored through an external object storage provider. Passwords are hashed before storage, and the backend does not intentionally store raw payment card data.
      </p>
    </section>

    <section class="card">
      <h2>2) How We Use Information</h2>
      <ul class="legal-list">
        <li>To create and secure accounts, authenticate users, and manage access permissions.</li>
        <li>To build and display role-specific profiles for players, coaches, scouts, and clubs.</li>
        <li>To support football discovery features such as job circulars, applications, match requests, and confirmations.</li>
        <li>To enable direct messaging, unread tracking, and real-time communication between users.</li>
        <li>To send notifications, password reset emails, and operational messages.</li>
        <li>To detect abuse, enforce rules, manage moderation, and keep the platform reliable and secure.</li>
        <li>To support admin dashboards, analytics, user management, and dispute handling.</li>
      </ul>
    </section>

    <section class="card">
      <h2>3) Legal Basis and Consent</h2>
      <p>
        We process information to provide the service you request, to protect the platform and its users, to comply with legal obligations,
        and where required, based on your consent. Some features, such as location sharing and notifications, depend on data you choose to provide.
      </p>
    </section>

    <section class="card">
      <h2>4) Sharing of Information</h2>
      <p class="muted">We may share limited data with trusted processors when needed to operate the service, including:</p>
      <ul class="legal-list">
        <li>Cloud storage providers for uploaded files and media.</li>
        <li>Email providers for account and password reset messages.</li>
        <li>Push notification services for mobile alerts and activity updates.</li>
        <li>Legal authorities where disclosure is required by law.</li>
        <li>Administrators and moderators with access rights needed to operate the service.</li>
      </ul>
      <p class="muted">
        We do not sell personal information.
      </p>
    </section>

    <section class="card">
      <h2>5) Data Retention</h2>
      <p>
        We keep data for as long as needed to provide services, maintain security and audit history,
        resolve disputes, and meet legal obligations. Retention periods vary by data type and operational need.
      </p>
    </section>

    <section class="card">
      <h2>6) Your Rights</h2>
      <p class="muted">Subject to local law, you may have the right to:</p>
      <ul class="legal-list">
        <li>Request access to your personal data.</li>
        <li>Request correction or deletion of inaccurate information.</li>
        <li>Object to certain processing activities.</li>
        <li>Request restriction or portability of your data.</li>
      </ul>
      <p>Requests can be made through the official support channel used by the platform.</p>
    </section>

    <section class="card">
      <h2>7) Security</h2>
      <p>
        We use reasonable technical and organizational safeguards to protect platform data, including access controls,
        authentication checks, role-based authorization, and monitored backend operations. No method of transmission or storage is fully risk-free.
      </p>
    </section>

    <section class="card">
      <h2>8) Cross-Border Processing</h2>
      <p>
        Because service providers may operate in multiple regions, data may be processed outside your home jurisdiction
        in accordance with applicable legal safeguards and the terms of those providers.
      </p>
    </section>

    <section class="card">
      <h2>9) Policy Updates</h2>
      <p>
        We may revise this Privacy Policy from time to time. Updated versions become effective upon publication
        on official platform channels. Continued use after publication indicates acceptance of the revised policy.
      </p>
    </section>

    <footer class="muted">
      Copyright Drafy Platform. For privacy requests, contact support through the app.
    </footer>
  </div>
</body>
</html>
`;
};
export const termsandconditions = () => {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Drafy - Terms and Conditions</title>
  <meta name="description" content="Terms and Conditions for the Drafy football networking platform" />
  <style>
    :root{
      --bg:#07111f;
      --bg-soft:#0d1b2f;
      --card:rgba(10, 23, 42, 0.82);
      --card-border:rgba(148, 163, 184, 0.16);
      --muted:#9fb0c7;
      --text:#eaf1fb;
      --accent:#4dd4ac;
      --accent-2:#7cdaff;
      --danger:#ff6b6b;
      --success:#66e29f;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    }
    html,body{height:100%}
    body{
      margin:0;
      color:var(--text);
      background:
        radial-gradient(circle at top left, rgba(77, 212, 172, 0.18), transparent 30%),
        radial-gradient(circle at top right, rgba(124, 218, 255, 0.14), transparent 26%),
        linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 100%);
      -webkit-font-smoothing:antialiased;
      -moz-osx-font-smoothing:grayscale;
      line-height:1.5;
      padding:24px;
    }
    .wrap{max-width:1040px;margin:0 auto}
    header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:20px;flex-wrap:wrap}
    header h1{font-size:28px;line-height:1.1;margin:0;color:var(--text);letter-spacing:-0.03em}
    header p{margin:6px 0 0;color:var(--muted);font-size:14px;max-width:68ch}
    .card{background:var(--card);border:1px solid var(--card-border);border-radius:20px;padding:22px;box-shadow:0 18px 45px rgba(1, 6, 15, 0.28);backdrop-filter:blur(14px);margin-bottom:16px}
    h2{margin:0 0 12px 0;font-size:18px;color:var(--text)}
    h3{margin:8px 0;color:var(--text);font-size:14px}
    p{margin:8px 0;color:var(--text)}
    ul{margin:10px 0 10px 20px;color:var(--muted)}
    ol{margin:10px 0 10px 20px;color:var(--muted)}
    .muted{color:var(--muted);font-size:13px}
    .pill{display:inline-block;padding:7px 12px;border-radius:999px;background:rgba(77, 212, 172, 0.14);color:var(--accent);font-weight:700;font-size:12px;border:1px solid rgba(77, 212, 172, 0.18)}
    .section-grid{display:grid;grid-template-columns:1fr;gap:12px}
    @media(min-width:840px){ .section-grid{grid-template-columns:1fr 360px} }
    .summary{font-size:15px;color:var(--text)}
    .cta{display:inline-block;padding:10px 14px;border-radius:999px;background:linear-gradient(135deg, var(--accent), var(--accent-2));color:#07111f;text-decoration:none;font-weight:800}
    footer{margin-top:18px;font-size:12px;color:var(--muted);text-align:center;padding-bottom:12px}
    .subtle{font-size:13px;color:var(--muted);margin-top:6px}
    .legal-list li{margin-bottom:6px}
    .hero-grid{display:grid;grid-template-columns:1fr;gap:16px}
    @media(min-width:900px){ .hero-grid{grid-template-columns:1.3fr 0.7fr} }
    .tag-grid{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
    .mini-panel{border:1px solid var(--card-border);border-radius:16px;padding:16px;background:rgba(255,255,255,0.03)}
    .mini-panel p{margin:6px 0 0}
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <div>
        <h1>Drafy Platform</h1>
        <p class="muted">Terms and Conditions for the football networking, scouting, and club management backend</p>
      </div>
      <div style="text-align:right">
        <span class="pill">Last updated: April 30, 2026</span>
        <div class="subtle">Terms and conditions document</div>
      </div>
    </header>

    <section class="card hero-grid">
      <div>
        <h2>Project Overview</h2>
        <p class="summary">
          Drafy is a backend service for football communities. It connects players, coaches, scouts, clubs, and admins through
          onboarding, role-specific profiles, job discovery, match requests, reporting, chat, notifications, uploads, and moderation.
        </p>
        <div class="tag-grid">
          <span class="pill">Authentication</span>
          <span class="pill">Profiles</span>
          <span class="pill">Jobs</span>
          <span class="pill">Matches</span>
          <span class="pill">Messaging</span>
        </div>
      </div>
      <div class="mini-panel">
        <h3>Service model</h3>
        <p class="muted">Role-based access, admin moderation, storage uploads, email OTP recovery, and push notifications.</p>
      </div>
    </section>

    <section class="card">
      <h2>1) Acceptance of Terms</h2>
      <p>
        By creating an account, accessing, or using the platform, you agree to these Terms and Conditions and any
        related policies published by the service operator. If you do not agree, do not use the platform.
      </p>
    </section>

    <section class="card">
      <h2>2) Accounts and Security</h2>
      <ul class="legal-list">
        <li>You must provide accurate account information and keep it updated.</li>
        <li>You are responsible for keeping your credentials and device access secure.</li>
        <li>You are responsible for all activity carried out through your account.</li>
        <li>We may suspend or terminate accounts involved in abuse, fraud, or policy violations.</li>
        <li>You must protect any OTP, reset link, or access token tied to your account.</li>
      </ul>
    </section>

    <section class="card">
      <h2>3) Acceptable Use</h2>
      <p class="muted">You agree not to use the platform to:</p>
      <ul class="legal-list">
        <li>Violate applicable law or the rights of others.</li>
        <li>Publish unlawful, harmful, hateful, defamatory, or deceptive content.</li>
        <li>Upload malware, phishing content, or attempt unauthorized access.</li>
        <li>Impersonate others, create fake identities, or misuse personal data without permission.</li>
        <li>Spam users, abuse messaging, or interfere with notifications or real-time communication features.</li>
        <li>Submit false job posts, false match requests, fake reports, or abusive moderation appeals.</li>
        <li>Interfere with APIs, services, moderation systems, storage, or security controls.</li>
      </ul>
    </section>

    <section class="card">
      <h2>4) User Content and Moderation</h2>
      <p>
        You retain ownership of the content you create, but you grant the platform a non-exclusive license to host,
        process, display, and transmit that content as needed to operate the service. We may remove, restrict, or
        report content that violates policy, legal requirements, or safety standards.
      </p>
      <p class="muted">This includes profile media, reports, messages, logos, gallery uploads, documents, and other submitted files.</p>
    </section>

    <section class="card">
      <h2>5) Jobs, Matches, Messaging, and Notifications</h2>
      <p>
        Job posts, job applications, match requests, confirmations, messaging, and notifications are user-driven.
        You are responsible for the accuracy of the information you submit and for your communications with other users.
      </p>
    </section>

    <section class="card">
      <h2>6) Profiles, Locations, and Reports</h2>
      <p>
        You are responsible for the profile, location, and report data you submit. By uploading certificates,
        cards, photos, or other documents, you confirm you have the right to share them and that they are accurate to the best of your knowledge.
      </p>
      <p class="muted">
        Location-based features rely on coordinates you choose to provide. Reports and scouting data should be submitted honestly and in good faith.
      </p>
    </section>

    <section class="card">
      <h2>7) Third-Party Services</h2>
      <p>
        The platform integrates external services for file storage, email delivery, push notifications, and infrastructure hosting.
        Availability and performance of those services are outside our direct control.
      </p>
    </section>

    <section class="card">
      <h2>8) Termination</h2>
      <p>
        We may suspend, restrict, or terminate access for policy violations, legal reasons, abuse,
        fraud, repeated misuse of reports or messaging, or behavior that threatens platform integrity or user safety.
      </p>
    </section>

    <section class="card">
      <h2>9) Disclaimer and Limitation of Liability</h2>
      <p>
        The platform is provided on an "as available" and "as is" basis, to the maximum extent permitted by law.
        We are not liable for indirect, incidental, special, or consequential damages, including loss of data,
        business interruption, or disputes arising from user-generated content, job posts, match requests, or third-party services.
      </p>
    </section>

    <section class="card">
      <h2>10) Changes to These Terms</h2>
      <p>
        We may update these Terms and Conditions periodically. Changes are effective when published through official
        platform channels. Continued use after publication means you accept the updated terms.
      </p>
    </section>

    <section class="card">
      <h2>11) Contact</h2>
      <p>
        For terms-related questions, compliance requests, or account issues, contact support through the official
        channel provided inside the platform.
      </p>
    </section>

    <footer class="muted">
      Copyright Drafy Platform. Use of the service is subject to these terms.
    </footer>
  </div>
</body>
</html>
`;
};
