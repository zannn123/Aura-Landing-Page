export const HELP_CATEGORIES = [
  {
    id: "getting-started",
    label: "Getting Started",
    blurb: "Sign in, install the app, and set up your account.",
    articles: [
      {
        id: "welcome",
        title: "Welcome to Aura",
        excerpt: "What Aura is and the first few things to know.",
        body: [
          "Aura is your school's attendance, events, and governance platform. It connects students, officers, school IT, and platform admins inside one role-aware workspace, so every event check-in, roster, and announcement lives in one place.",
          "If you're a student, you'll spend most of your time on the dashboard and schedule. If you're an officer or admin, you also have a governance workspace for creating events and monitoring attendance.",
          "Everything is scoped to your school — Aura never mixes your data with another school's."
        ]
      },
      {
        id: "first-sign-in",
        title: "Signing in for the first time",
        excerpt: "Temporary credentials, password change, and first-time setup.",
        body: [
          "Your school's IT team creates your account and gives you a temporary password. Open Aura, enter your school email and that temporary password, and you'll be prompted to set a new password immediately — Aura won't let you continue until you do.",
          "After your new password is set, you'll be asked to grant camera, location, and notification permissions. Approving these now saves time at your first event check-in."
        ]
      },
      {
        id: "install-android",
        title: "Installing the Aura Android app",
        excerpt: "Download the APK and install it on your phone.",
        body: [
          "Tap Download APK on the Aura site to get the latest build (v1.33.2). When the download finishes, open the file from your notification shade or downloads folder and tap Install.",
          "If Android shows \"Install blocked\" or asks about \"unknown sources,\" tap Settings → allow your browser to install once, then return and tap Install again. You only need to do this the first time.",
          "Once installed, open Aura from your home screen and sign in with your school account."
        ]
      },
      {
        id: "install-ios",
        title: "Using Aura on iPhone",
        excerpt: "The native iOS app is on its way — here's how to use Aura today.",
        body: [
          "The native iOS app is in development. While our team raises funding for the Apple Developer Program subscription, Aura runs as an installable web app on iPhone via Safari.",
          "Open the Aura site in Safari, tap the Share icon, scroll to \"Add to Home Screen,\" then tap Add. The web app behaves like a real app — full-screen, with its own icon and quick access to the camera for face check-in."
        ]
      },
      {
        id: "register-face",
        title: "Registering your face",
        excerpt: "Set up biometric verification for attendance check-in.",
        body: [
          "Open the Aura app and go to Account → Face Registration. Hold the phone at arm's length, look at the camera in even lighting, and follow the on-screen guide. Capture takes about 20 seconds.",
          "Once your face is enrolled, you'll use it to check in to events. You can re-register anytime from the same screen if your appearance changes (new glasses, haircut, etc.)."
        ]
      },
      {
        id: "workspaces-by-role",
        title: "What your workspace looks like by role",
        excerpt: "Students, officers, school IT, and platform admins see different things.",
        body: [
          "Aura uses role-based access. Students see a personal dashboard with their attendance, schedule, and reports. Officers (SSG, SG, ORG) see a governance workspace with event creation and member management. School IT sees the campus admin tools — user management, bulk imports, and operational settings. Platform admins see multi-school oversight.",
          "Your role is assigned by your school. If something looks missing, your role probably doesn't include that feature — contact your campus admin if you think you need elevated access."
        ]
      }
    ]
  },
  {
    id: "attendance",
    label: "Attendance & Check-In",
    blurb: "Face scan, geofence, status meanings, and history.",
    articles: [
      {
        id: "how-attendance-works",
        title: "How attendance works in Aura",
        excerpt: "Face scan first, manual fallback when needed.",
        body: [
          "Aura's primary check-in method is a one-second face scan that runs locally on your phone's camera. Some events also require you to be inside a geofence (a set distance around the event location) for the check-in to count.",
          "If your face scan fails after three tries, an officer can mark you Manual — your attendance still counts the same. No paper, no roll call."
        ]
      },
      {
        id: "check-in-steps",
        title: "Checking in to an event",
        excerpt: "Step by step at the door of the event.",
        body: [
          "Open the Aura app inside the event's check-in window. The event you're eligible for appears at the top of the home screen — tap it. Center your face in the camera frame and hold still for about a second. You'll see Attendance Marked once the scan matches your profile.",
          "If you see \"location required,\" make sure you're inside the event area and your phone has GPS enabled."
        ]
      },
      {
        id: "attendance-status",
        title: "Present, Late, Pending, Absent, Manual, Excused — what they mean",
        excerpt: "The six attendance statuses explained.",
        body: [
          "Present means you checked in during the on-time window. Late means you checked in during the late window. Pending means your check-in is awaiting officer review. Absent means the window closed without a check-in. Manual means an officer recorded your attendance in person. Excused means an officer marked you absent with an approved reason.",
          "All statuses count toward your event participation — only Absent counts against you."
        ]
      },
      {
        id: "geofence",
        title: "Location-based check-in (geofence)",
        excerpt: "Why Aura sometimes needs your location.",
        body: [
          "Some events use geofencing to verify that attendees are physically present. When you open the event, Aura checks your GPS coordinates against the event's boundary. If you're inside, check-in proceeds normally. If you're outside, you'll see \"Move closer to the event location.\"",
          "Aura only reads your location during the check-in moment — it doesn't track you in the background, and the coordinates are not stored after the check-in is recorded."
        ]
      },
      {
        id: "face-scan-troubleshooting",
        title: "My face scan keeps failing",
        excerpt: "Lighting, glasses, and re-enrollment.",
        body: [
          "Most failures come down to lighting. Move to a brighter spot, face an even light source (not a backlight), and make sure nothing covers your face — glasses, masks, and hats can reduce the match quality.",
          "Wipe the front camera lens, then try again. If three attempts fail, ask the event officer to mark you Manual. If failures continue at every event, re-enroll your face from Account → Face Registration."
        ]
      },
      {
        id: "check-in-rejected",
        title: "My check-in was rejected",
        excerpt: "Eligibility rules and how to fix them.",
        body: [
          "Common reasons: the event is outside your scope (wrong year level, department, or program), your account is inactive, or you're outside the geofence. The error message at the top of the screen tells you which check failed.",
          "If you believe you should be eligible, contact the event officer. They can verify the target scope and either correct it or record you Manual."
        ]
      },
      {
        id: "sign-out",
        title: "Signing out of an event",
        excerpt: "Check-out windows and grace periods.",
        body: [
          "Some events require both a check-in and a check-out. The check-out window opens during the event's later half. Open the event and tap Check Out — Aura uses the same face scan flow as check-in.",
          "Most events also give a short grace period after the official end time. If you miss the window, contact the event officer."
        ]
      },
      {
        id: "attendance-history",
        title: "Viewing your attendance history",
        excerpt: "Where to see past records and reports.",
        body: [
          "Open Analytics from your dashboard. You'll see a list of every event you were eligible for, your check-in status, and the timestamp. Filter by date range, event type, or status using the filter chips at the top.",
          "Tap any event to see its full details — including the officer who recorded the entry (helpful when you need to ask about a record)."
        ]
      },
      {
        id: "manual-entry",
        title: "Manual attendance entry (officers only)",
        excerpt: "When and how officers record attendance in person.",
        body: [
          "If a student's face scan fails or their phone is unavailable, an authorized officer can record their attendance manually. Open the event you're managing, tap Manual Entry, find the student, and select their status.",
          "Manual entries are logged with the officer's name and timestamp. Only officers assigned to the event can use this feature."
        ]
      },
      {
        id: "dispute-attendance",
        title: "I think my attendance is wrong",
        excerpt: "How to dispute a missing or incorrect record.",
        body: [
          "First, check Analytics to confirm the record. If the status looks wrong, contact the event officer directly — their name is on the event detail. Provide the event name, date, and what you believe the correct status should be.",
          "If the officer can't resolve it, escalate to your campus admin. Disputes are reviewed against check-in timestamps and the officer's notes."
        ]
      }
    ]
  },
  {
    id: "events",
    label: "Events & Schedule",
    blurb: "Browse events, understand requirements, and read announcements.",
    articles: [
      {
        id: "view-events",
        title: "Viewing your upcoming events",
        excerpt: "Where to find what's scheduled for you.",
        body: [
          "Open the Schedule tab. Every event you're eligible for appears in chronological order, with date, time, location, and the required check-in method. Use the filter chips to narrow to today, this week, or by event type.",
          "Calendar view (tap the calendar icon) gives you a month overview if you prefer that layout."
        ]
      },
      {
        id: "event-details",
        title: "Reading an event's details",
        excerpt: "Everything an event card tells you.",
        body: [
          "Tap any event to see the full detail: location with a map preview, exact check-in and check-out windows, target scope (who's required to attend), and any announcements posted by the officers.",
          "If the event uses geofencing, you'll see a boundary on the map — that's where Aura accepts check-ins."
        ]
      },
      {
        id: "target-scopes",
        title: "Why some events appear and others don't",
        excerpt: "Target scopes: ALL, YEAR LEVEL, DEPARTMENT, COURSE.",
        body: [
          "Each event has a target scope set by the officer creating it. ALL means everyone in your school. YEAR LEVEL means a specific year. DEPARTMENT or COURSE narrows further.",
          "If you don't see an event you expected, the target scope likely doesn't include you. Ask the event officer — they can correct the scope if needed."
        ]
      },
      {
        id: "announcements",
        title: "Reading announcements",
        excerpt: "Updates, changes, and special instructions.",
        body: [
          "Announcements appear on each event's detail screen and trigger a push notification when posted. Officers use them for last-minute changes — moved check-in time, dress code, cancellations.",
          "Pull down to refresh the event if you suspect there's a new announcement waiting."
        ]
      },
      {
        id: "create-event",
        title: "Creating an event (officers)",
        excerpt: "Step-by-step from your governance workspace.",
        body: [
          "Open the Governance workspace and tap Create Event. Fill in the title, description, location, on-time and late windows, and target scope. If you want geofencing, drag the boundary on the map until it covers the venue.",
          "Save the event as Draft to keep editing, or Publish to make it visible to your target audience right away. You can edit any field until the first check-in is recorded."
        ]
      },
      {
        id: "event-timing",
        title: "Configuring event timing",
        excerpt: "On-time window, late window, and sign-out grace.",
        body: [
          "Three timing fields shape attendance status: the on-time window (when Present is recorded), the late window (when Late is recorded), and the sign-out grace (extra time after the official end for check-outs).",
          "Common values: 15-minute on-time, 30-minute late, 10-minute sign-out grace. Adjust based on your event's flexibility."
        ]
      },
      {
        id: "event-location",
        title: "Setting an event's location & geofence",
        excerpt: "Pick a venue and draw the boundary.",
        body: [
          "Search for the venue in the location field, then adjust the geofence radius. A 20-meter radius is tight enough to prevent off-site check-ins but generous enough to handle GPS drift indoors.",
          "Skip geofencing for online or large outdoor events — students outside the boundary will get \"Move closer\" errors unnecessarily."
        ]
      },
      {
        id: "event-monitor",
        title: "Monitoring check-ins live",
        excerpt: "Real-time attendance during your event.",
        body: [
          "Open the event from your Governance workspace and tap Monitor. You'll see check-ins stream in live, sorted by time. Tap any entry to see the full record — face scan match score, location, and timestamp.",
          "Manual Entry is available from the same screen if a student needs help."
        ]
      },
      {
        id: "edit-event",
        title: "Editing or cancelling an event",
        excerpt: "Make changes after publishing.",
        body: [
          "Open the event from Governance Events and tap Edit. Most fields stay editable until the first check-in arrives. After that, only the announcement field and check-out time can change.",
          "To cancel, open the event and tap Cancel — Aura sends a push notification to every targeted student automatically."
        ]
      },
      {
        id: "scope-mistakes",
        title: "Common targeting mistakes",
        excerpt: "Why your event isn't reaching the right students.",
        body: [
          "If students say they don't see your event, check three things: the target scope (is it ALL, or correctly narrowed?), the event status (Draft hides it), and the publish timestamp (events with past start times don't show on the home screen).",
          "Re-publishing after a fix re-notifies the audience."
        ]
      }
    ]
  },
  {
    id: "reports",
    label: "Reports & Insights",
    blurb: "Export attendance data, view analytics, and read trends.",
    articles: [
      {
        id: "attendance-reports",
        title: "Understanding attendance reports",
        excerpt: "What a report shows and who can read it.",
        body: [
          "Reports come in two shapes: per-student (your own attendance across events) and per-event (everyone's attendance at one event). Students see only their own per-student reports. Officers and admins see per-event reports for events they manage.",
          "Each row includes status, check-in timestamp, location, and the recording officer. Filter by date range or status before exporting."
        ]
      },
      {
        id: "export-reports",
        title: "Exporting reports as PDF or Excel",
        excerpt: "Download attendance data for offline review.",
        body: [
          "Open the report you want to export, set your filters, then tap the Export button. Pick PDF for a formatted document or Excel for a sortable spreadsheet.",
          "Exports respect your role — students can only export their own data, officers their event's data, admins the entire school's."
        ]
      },
      {
        id: "governance-reports",
        title: "Governance reports for officers",
        excerpt: "Per-event and per-unit reporting.",
        body: [
          "From Governance, tap Reports to see attendance summaries for events you've run. Compare attendance rates across events, identify chronic absences, and review officer-recorded manual entries.",
          "School-wide rollups are available to SSG officers and campus admins."
        ]
      },
      {
        id: "analytics-trends",
        title: "Reading the analytics view",
        excerpt: "Bars, donuts, and what they actually mean.",
        body: [
          "Analytics turns raw records into trends. The monthly bar chart shows events attended per month. The status donut shows your Present/Late/Absent split. Tap any chart segment to drill into the underlying records.",
          "Trends always cover the last 90 days by default — change the range from the filter."
        ]
      },
      {
        id: "filtering-reports",
        title: "Filtering report data",
        excerpt: "Narrow by date, event, scope, or status.",
        body: [
          "Every report view has a filter row at the top. Combine filters freely: \"last 30 days,\" \"Department: BSCPE,\" \"Status: Absent or Late.\"",
          "Filters apply to the export too — what you see on screen is what you'll get in PDF or Excel."
        ]
      }
    ]
  },
  {
    id: "account",
    label: "Your Account",
    blurb: "Password, profile, sessions, and account safety.",
    articles: [
      {
        id: "change-password",
        title: "Changing your password",
        excerpt: "How to update your password in-app.",
        body: [
          "Go to Account → Security → Change Password. Enter your current password, then your new password twice. Passwords must be at least 8 characters and include both letters and numbers.",
          "You'll stay signed in on the device you're using; other sessions on other devices will be signed out for safety."
        ]
      },
      {
        id: "forgot-password",
        title: "Resetting a forgotten password",
        excerpt: "Use the reset link or contact School IT.",
        body: [
          "Tap \"Forgot password?\" on the login screen and enter your school email. A reset link arrives within a few minutes. Open the link, set a new password, and return to sign in.",
          "If you never receive the email — check spam, then contact your campus admin. Only School IT can reset accounts that have never logged in."
        ]
      },
      {
        id: "profile",
        title: "Managing your profile",
        excerpt: "Name, photo, email, and preferences.",
        body: [
          "Account → Profile shows your name, email, and photo. Most fields are read-only because your school manages the source of truth. The exceptions are your profile photo and your notification preferences.",
          "If a field is wrong (misspelled name, wrong department), message your campus admin to correct it on their end."
        ]
      },
      {
        id: "sessions",
        title: "Reviewing active sessions",
        excerpt: "See where you're signed in and sign out remotely.",
        body: [
          "Account → Security → Sessions lists every device currently signed in to your Aura account, with the device type and last activity time. Tap any session to sign it out remotely.",
          "If you see a session you don't recognize, sign it out immediately and change your password."
        ]
      },
      {
        id: "update-face",
        title: "Updating your face profile",
        excerpt: "Re-enroll if your appearance changes.",
        body: [
          "If your face scan starts failing consistently — new glasses, big haircut, weight change — re-enroll your face. Go to Account → Face Registration → Update Face. Capture fresh frames in good lighting.",
          "Your old face profile is replaced, not stored alongside the new one."
        ]
      },
      {
        id: "inactivity",
        title: "Account inactivity",
        excerpt: "What happens if you don't sign in for a while.",
        body: [
          "Accounts that have never signed in within a school year are marked Inactive. Inactive accounts can't check in or see events until reactivated.",
          "Contact your campus admin to reactivate — they can flip the status back to Active in seconds."
        ]
      },
      {
        id: "shared-devices",
        title: "Signing out on shared devices",
        excerpt: "Best practices for kiosks and shared phones.",
        body: [
          "If you sign in on a shared device (a library kiosk, a friend's phone, a gather station), always sign out from Account → Sign Out before leaving. The session lives on the device until explicitly ended.",
          "For extra safety, sign in to your own device afterward and use the Sessions screen to confirm only your devices are active."
        ]
      }
    ]
  },
  {
    id: "notifications",
    label: "Notifications",
    blurb: "Push notifications, email, and preferences.",
    articles: [
      {
        id: "notification-types",
        title: "Notification types",
        excerpt: "What Aura sends and why.",
        body: [
          "Aura sends four kinds of notifications: event reminders (before an event starts), attendance confirmations (after a successful check-in), announcement alerts (when officers post updates), and security notices (sign-in from a new device, password changed).",
          "Each type can be toggled independently."
        ]
      },
      {
        id: "enable-notifications",
        title: "Enabling notifications",
        excerpt: "Grant permission on first launch — or later.",
        body: [
          "Aura asks for notification permission the first time you open the app. If you tapped Don't Allow, you can re-enable it later from your device's Settings → Aura → Notifications.",
          "Inside the app, also visit Account → Notifications to confirm each notification type is turned on."
        ]
      },
      {
        id: "preferences",
        title: "Customizing notification preferences",
        excerpt: "Turn off the noisy stuff.",
        body: [
          "Account → Notifications has a switch for each notification type. Common setups: keep event reminders and announcements on, mute attendance confirmations if you trust the system, always keep security notices on.",
          "Pause all notifications during exam weeks without losing your settings — the toggle is at the top of the screen."
        ]
      },
      {
        id: "android-push",
        title: "Push notifications on Android",
        excerpt: "Device-level settings that affect Aura.",
        body: [
          "Some Android skins (Xiaomi MIUI, Samsung OneUI, Huawei EMUI) put aggressive battery-savers on apps by default. If Aura notifications arrive late or not at all, find Aura in Settings → Apps → Battery and set it to Unrestricted.",
          "Also enable Auto-start for Aura on devices that have that switch (MIUI, ColorOS)."
        ]
      },
      {
        id: "email",
        title: "Email notifications",
        excerpt: "When emails come and how to opt out.",
        body: [
          "Email is used for password resets, security notices, and (if your school enables it) event reminders. You can opt out of non-security emails from Account → Notifications → Email Preferences.",
          "Security emails always send — they're how we let you know about a sign-in from an unfamiliar device."
        ]
      },
      {
        id: "missing-notifications",
        title: "I'm not receiving notifications",
        excerpt: "Quick troubleshooting checklist.",
        body: [
          "Check three things in order: (1) device permission for Aura is On, (2) the notification type is on inside Account → Notifications, (3) the app is allowed to run in the background.",
          "If everything looks right but pushes still don't arrive, sign out and back in — that re-registers your device with the notification service."
        ]
      }
    ]
  },
  {
    id: "mobile-app",
    label: "Mobile App",
    blurb: "Android & iOS specifics, updates, and offline behavior.",
    articles: [
      {
        id: "android-install-detail",
        title: "Android: installing the APK",
        excerpt: "Detailed steps including permission prompts.",
        body: [
          "Download Aura.apk from the Aura site. Open it from your notification shade. If Android blocks the install, tap Settings, allow your browser to install once, then return and tap Install again.",
          "First launch asks for camera, location, and notification permissions in sequence — approve all three to get the full experience."
        ]
      },
      {
        id: "ios-pwa",
        title: "iOS: installing Aura as a web app",
        excerpt: "Until the native iOS app ships.",
        body: [
          "Open the Aura site in Safari (Chrome and Firefox on iOS don't support \"Add to Home Screen\"). Tap the Share icon, scroll to \"Add to Home Screen,\" tap Add.",
          "The web app behaves like a real app — full-screen, with its own icon. Camera access works for face check-in. iOS 16.4 or later required."
        ]
      },
      {
        id: "permissions",
        title: "App permissions explained",
        excerpt: "Camera, location, and notifications — why each is needed.",
        body: [
          "Camera is used only at check-in time to perform face scans on-device. Location is read only at check-in for geofenced events and is not retained. Notifications deliver event reminders and announcements.",
          "Aura does not read your contacts, photos, microphone, or SMS. You can revoke any permission from your device settings — features that depend on the revoked permission will simply stop working."
        ]
      },
      {
        id: "updating",
        title: "Updating the app",
        excerpt: "How to get the latest version.",
        body: [
          "On Android, when a new version ships, you'll see an Update Available banner on the home screen. Tap it to download and install — your session stays intact across the update.",
          "On the web app, updates roll out automatically when you refresh."
        ]
      },
      {
        id: "mobile-vs-web",
        title: "Mobile vs. web — what's different",
        excerpt: "Features that exist on one but not the other.",
        body: [
          "The mobile app is the primary surface for students: face scan, geofence check-in, and push notifications all work natively. The web interface is best for officers and admins managing bulk operations — events, user imports, reports.",
          "Some governance features (drag-to-set geofence, bulk user import) are easier on web. Some student flows (face scan) are mobile-only."
        ]
      },
      {
        id: "offline",
        title: "Using Aura offline",
        excerpt: "What works without internet.",
        body: [
          "Aura caches your schedule, profile, and recent attendance, so you can browse them offline. Check-in itself requires a connection — face match runs locally, but the result is sent to the server immediately.",
          "If your check-in happens during a brief outage, Aura queues it and sends it as soon as you're back online."
        ]
      },
      {
        id: "wont-install",
        title: "The app won't install",
        excerpt: "Storage, version, and security prompts.",
        body: [
          "Most install failures come from low storage or a blocked source. Free up at least 200 MB and re-download the APK. If \"Install blocked\" appears, your device is restricting installs from browsers — temporarily allow it from Settings → Apps → your browser → Install unknown apps.",
          "On older Android (pre-7.0), Aura is not supported."
        ]
      },
      {
        id: "wont-load",
        title: "The app won't load",
        excerpt: "Network, cache, and reinstall.",
        body: [
          "If the app opens to a blank screen, force-close it and reopen. If that doesn't help, sign out, sign back in, and pull-to-refresh the home screen.",
          "As a last resort, uninstall and reinstall — your data lives on the server, not the device."
        ]
      },
      {
        id: "crashes",
        title: "The app keeps crashing",
        excerpt: "Diagnose and report.",
        body: [
          "First, restart your phone — most crashes resolve there. If they continue, clear the app cache from Settings → Apps → Aura → Storage → Clear Cache.",
          "When reporting the crash, include your device model, Android version, and the exact screen you were on. Send to your campus admin or the support email below."
        ]
      }
    ]
  },
  {
    id: "roles",
    label: "Roles & Governance",
    blurb: "What students, officers, and admins can do.",
    articles: [
      {
        id: "your-role",
        title: "Understanding your role",
        excerpt: "Six distinct roles, each with its own permissions.",
        body: [
          "Aura has six roles: Student, SSG Officer, SG Officer, ORG Officer, Campus Admin (School IT), and Platform Admin. Each one sees a different set of features tailored to what they need to do.",
          "Your role is set by your school. Open Account → Profile to confirm yours."
        ]
      },
      {
        id: "student-role",
        title: "Student role",
        excerpt: "View events, check in, view records, manage profile.",
        body: [
          "Students see their personal dashboard, schedule, attendance history, and profile. They can check in to events, read announcements, and export their own attendance reports.",
          "Students cannot create events, see other students' records, or change roles."
        ]
      },
      {
        id: "ssg-officer",
        title: "SSG Officer (Student Government)",
        excerpt: "School-wide events and attendance.",
        body: [
          "SSG officers create events targeting any audience in the school — ALL, by year level, by department, or by program. They monitor live check-ins, post announcements, and generate per-event reports.",
          "SSG officers also assign sub-officers and view school-wide attendance rollups."
        ]
      },
      {
        id: "sg-officer",
        title: "SG Officer (Department / Council)",
        excerpt: "Department-scoped events.",
        body: [
          "SG officers manage events scoped to their department or council. They have the same event creation, monitoring, and reporting tools as SSG officers — just limited to their unit.",
          "An SG officer can be promoted to SSG by a campus admin if their responsibilities change."
        ]
      },
      {
        id: "org-officer",
        title: "ORG Officer (Organization / Club)",
        excerpt: "Organization-scoped events.",
        body: [
          "ORG officers run events for their student organization. Scope is limited to the organization's members. Same toolkit as SG, applied to the org's roster.",
          "Organizations can be created or merged by campus admins."
        ]
      },
      {
        id: "campus-admin",
        title: "Campus Admin (School IT)",
        excerpt: "User management, imports, and operations.",
        body: [
          "Campus admins manage every user in the school. They onboard students (one-by-one or via bulk Excel import), assign roles, reset passwords, and monitor school-wide attendance.",
          "Campus admins also configure default event timing, geofence sizes, and notification policies for the school."
        ]
      },
      {
        id: "platform-admin",
        title: "Platform Admin",
        excerpt: "Multi-school oversight.",
        body: [
          "Platform admins operate at the Aura platform level — across all schools. They onboard new schools, manage subscriptions, and access technical logs.",
          "Most users never interact with a platform admin. Escalation from campus admin is the normal path."
        ]
      },
      {
        id: "assign-officers",
        title: "Assigning officers",
        excerpt: "How SSG and admins promote students.",
        body: [
          "Open the Governance workspace (SSG) or School IT → Users (admin), find the student, and tap Assign Officer. Pick the role (SG or ORG), the unit they'll manage, and confirm.",
          "The student's role flips on their next sign-in. They'll see the new workspace immediately."
        ]
      },
      {
        id: "officer-permissions",
        title: "Officer permissions matrix",
        excerpt: "Who can do what across SSG, SG, ORG.",
        body: [
          "All three officer roles can: create events scoped to their unit, monitor check-ins, post announcements, generate reports, and assign sub-officers within their unit.",
          "Only SSG can target ALL or any cross-department scope. SG and ORG are limited to their unit."
        ]
      },
      {
        id: "governance-hierarchy",
        title: "Governance hierarchy",
        excerpt: "SSG → SG → ORG, and how they relate.",
        body: [
          "SSG (school-wide student government) sits at the top of the student-led structure. SG units (departments, councils) sit below, scoped to a part of the school. ORG units (organizations, clubs) operate alongside SG with their own member rosters.",
          "Campus admin can adjust the hierarchy when units restructure."
        ]
      }
    ]
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    blurb: "Quick fixes for common problems.",
    articles: [
      {
        id: "login-issues",
        title: "I can't sign in",
        excerpt: "Wrong credentials, inactive account, or expired password.",
        body: [
          "Confirm you're using your school email (not a personal Gmail) and the most recent password. If the password fails, use the Forgot Password link. If that doesn't email you, your account may be inactive — contact your campus admin to reactivate.",
          "Force-close the app and try again if the screen freezes during sign-in."
        ]
      },
      {
        id: "temp-password",
        title: "It keeps asking me to change my password",
        excerpt: "First-time password change is mandatory.",
        body: [
          "On your first sign-in after a password reset, Aura forces you to set a new password before continuing. The temporary password only works once.",
          "Choose a new password (8+ characters, letters and numbers) and submit. You'll arrive at the home screen immediately."
        ]
      },
      {
        id: "session-expired",
        title: "Session expired",
        excerpt: "When and why Aura signs you out.",
        body: [
          "Sessions expire after extended inactivity (typically two weeks) or when you change your password from another device. You'll be returned to the login screen — sign in again to continue.",
          "Active sessions on each device are listed in Account → Security → Sessions."
        ]
      },
      {
        id: "camera-permission",
        title: "Camera permission denied",
        excerpt: "How to re-enable.",
        body: [
          "Go to your device's Settings → Apps → Aura → Permissions → Camera and switch it on. Without camera, face scan and check-in won't work.",
          "On iOS web app, the permission lives in Safari → Settings → Camera."
        ]
      },
      {
        id: "location-permission",
        title: "Location permission denied",
        excerpt: "Required for geofenced events.",
        body: [
          "Open Settings → Apps → Aura → Permissions → Location and pick Allow only while using. Aura never accesses location in the background.",
          "If you only deny location and the event requires geofencing, you'll see \"Location required\" at check-in."
        ]
      },
      {
        id: "gps-inaccuracy",
        title: "GPS is inaccurate",
        excerpt: "Indoor venues and dense urban areas.",
        body: [
          "GPS can drift 20+ meters indoors. If Aura says you're outside the geofence but you're clearly inside the venue, step toward a window or doorway for a clearer fix, then re-try.",
          "Officers can record Manual attendance if GPS keeps failing."
        ]
      },
      {
        id: "event-missing",
        title: "An event is missing from my dashboard",
        excerpt: "Scope, draft status, or already passed.",
        body: [
          "First check the target scope — is the event scoped to your year level, department, or course? If not, ask the officer to adjust. Second, the event might still be a Draft — only Published events appear to students.",
          "Past events don't show on the home screen; you can still find them in your attendance history."
        ]
      },
      {
        id: "already-checked-in",
        title: "\"Already checked in\" error",
        excerpt: "Duplicate prevention.",
        body: [
          "Aura blocks duplicate check-ins for the same event. If you see this and your record looks correct in Analytics, you're done — no action needed.",
          "If your record doesn't show the check-in, contact the event officer."
        ]
      },
      {
        id: "data-not-loading",
        title: "Data won't load",
        excerpt: "Network, server, or cache.",
        body: [
          "Pull-to-refresh first. If still blank, check your connection. If your connection is fine, the backend may be temporarily down — wait a few minutes and try again.",
          "If the problem persists for more than 15 minutes, contact your campus admin."
        ]
      },
      {
        id: "slow-performance",
        title: "The app is slow",
        excerpt: "Clear cache and update.",
        body: [
          "Slow performance usually traces to a full cache or an outdated build. Clear the cache (Settings → Apps → Aura → Storage), then make sure you're on the latest APK.",
          "Restart your phone if performance issues persist across multiple apps."
        ]
      },
      {
        id: "support-info",
        title: "What to include in a support request",
        excerpt: "Help us help you faster.",
        body: [
          "Always include: your role, your school, the exact screen you were on, what you tried to do, what actually happened, and a screenshot if possible. Add device model and Android/iOS version for crashes.",
          "Send all of this in one message — back-and-forth slows the fix."
        ]
      }
    ]
  },
  {
    id: "privacy",
    label: "Privacy & Data",
    blurb: "What Aura stores, who can see it, and how it's protected.",
    articles: [
      {
        id: "data-isolation",
        title: "Your school's data stays at your school",
        excerpt: "School-level isolation explained.",
        body: [
          "Every record in Aura — students, events, attendance, face profiles, reports — is tagged with a school ID. No school can read, search, or export another school's data. Cross-school queries are blocked at the database layer, not just in the app.",
          "This holds true for platform admins too: even our own staff requires a school's explicit approval before accessing that school's records."
        ]
      },
      {
        id: "what-we-store",
        title: "What Aura stores about you",
        excerpt: "An exhaustive list.",
        body: [
          "We store: your school email, name, photo, school, role, attendance records, event participation, face profile (encrypted), notification preferences, sign-in history, and device sessions.",
          "We do not store: your contacts, your photos, your messages, your microphone audio, or your location history outside of an active check-in."
        ]
      },
      {
        id: "face-data",
        title: "How your face data is handled",
        excerpt: "Storage, use, and deletion.",
        body: [
          "Face profiles are stored as encrypted embeddings (not photos) on Aura's servers, scoped to your school. They're used only for attendance verification — never for ad targeting, identity sales, or anything else.",
          "You can delete your face profile from Account → Face Registration at any time. Deletion is permanent — you'll need to re-enroll to use face check-in again."
        ]
      },
      {
        id: "location-data",
        title: "How your location data is handled",
        excerpt: "Only at check-in, never in the background.",
        body: [
          "Aura reads your GPS coordinates only when you press Check In on a geofenced event. The coordinate is compared against the event boundary, then either recorded with the attendance entry or discarded if check-in fails.",
          "We do not track your location between check-ins. Aura cannot run in the background to read your location."
        ]
      },
      {
        id: "who-can-see",
        title: "Who can see your data",
        excerpt: "Role-based access at every level.",
        body: [
          "Students see only their own data. Officers see attendance data for events they manage. Campus admins see school-wide data. Platform admins see infrastructure-level data, not individual student records, unless a school explicitly grants access.",
          "Aura logs every access. Suspicious access patterns trigger an automatic security review."
        ]
      },
      {
        id: "rbac",
        title: "Role-based access control",
        excerpt: "Why some features are visible and others aren't.",
        body: [
          "Your role determines which features and which records you can see. The same database powers every role, but the queries are scoped by your role's permissions.",
          "If you think your role is missing a feature you need, contact your campus admin — they can adjust roles."
        ]
      },
      {
        id: "data-requests",
        title: "Requesting your data or account deletion",
        excerpt: "How to exercise data rights.",
        body: [
          "Aura honors data export and account deletion requests. Submit your request through your campus admin — they verify your identity and forward it to the platform team.",
          "Export delivery is typically within 7 business days. Deletion is final and removes your records from your school's scope; some legally required records (e.g., academic compliance) may be retained per your school's policy."
        ]
      },
      {
        id: "ai-privacy",
        title: "How the AI assistant handles your data",
        excerpt: "Aura AI is scoped to your school context.",
        body: [
          "Queries you send the Aura AI assistant are answered using only your school's data, within your role's scope. The assistant cannot access other schools, and its responses log to the same audit trail as any other data access.",
          "Conversation history is stored briefly to give the assistant context; you can clear it at any time from the chat screen."
        ]
      }
    ]
  },
  {
    id: "privacy-policy",
    label: "Privacy Policy",
    blurb: "Full privacy policy document.",
    articles: [
      {
        id: "privacy-policy-full",
        title: "Aura Privacy Policy",
        excerpt: "Effective 2026 — full text.",
        body: [
          "**Last updated: May 2026**",
          "Aura (\"we,\" \"us,\" \"our\") is a school attendance and governance platform. This Privacy Policy describes how we collect, use, store, and protect information from students, officers, and administrators of subscribing schools.",
          "**1. School-Level Isolation.** Every record in Aura is tagged with a school ID. No school can access another school's data. Cross-school queries are rejected at the database layer.",
          "**2. Information we collect.** We collect: school-issued email, name, profile photo, school ID, role assignment, attendance records, event participation history, face biometric embeddings (not raw images), notification preferences, sign-in timestamps and devices, and limited diagnostic data (app version, OS version).",
          "**3. Information we do not collect.** We do not access your contacts, your photos, your microphone, your SMS, or your continuous location. We do not sell personal information to third parties.",
          "**4. Face data.** Face profiles are stored as encrypted mathematical embeddings, not photographs. Embeddings are used exclusively for attendance verification within your school. They are deleted on user request or upon account termination.",
          "**5. Location data.** Aura reads your GPS coordinates only at the moment of a geofenced event check-in. Coordinates are recorded alongside the attendance entry to verify presence, then no further location collection occurs until the next check-in.",
          "**6. Access controls.** Role-based access ensures that students see only their own data, officers see only their event's data, and admins see only their school's data. All access is logged.",
          "**7. Data retention.** Attendance records, event records, and account data are retained according to each school's documented retention policy. Default retention is the duration of the student's enrollment plus one school year.",
          "**8. Data export and deletion rights.** Users may request a copy of their data or deletion of their account through their school's campus admin. We respond to verified requests within 7 business days.",
          "**9. Security.** All data is encrypted in transit (TLS 1.2+) and at rest. Face embeddings are stored with additional application-layer encryption. We perform routine security reviews and respond to vulnerability reports promptly.",
          "**10. Children's data.** Aura is intended for use by school-enrolled individuals. Schools are responsible for obtaining parental consent for students under the age of majority per local law.",
          "**11. Contact.** Privacy questions go to your campus admin first; escalations route to the Aura platform team via the support email below.",
          "**12. Changes.** Material changes to this Policy will be announced inside the app and via email at least 30 days before taking effect."
        ]
      }
    ]
  },
  {
    id: "terms",
    label: "Terms of Service",
    blurb: "Rules of use, account ownership, and acceptable behavior.",
    articles: [
      {
        id: "terms-full",
        title: "Aura Terms of Service",
        excerpt: "Effective 2026 — full text.",
        body: [
          "**Last updated: May 2026**",
          "By using Aura, you agree to these Terms of Service. If you do not agree, do not use the service.",
          "**1. Account ownership.** Your account is created and managed by your school. Your school can revoke access, reset your password, change your role, and delete your account in accordance with its policies.",
          "**2. Account responsibility.** You are responsible for keeping your credentials confidential. Do not share your password. All activity under your account is treated as your activity.",
          "**3. Attendance integrity.** Submitting a check-in on behalf of someone else, manipulating face data, or interfering with geofence accuracy is prohibited. Officers who record manual entries must follow their school's policy and may be held accountable for false entries.",
          "**4. Role-based usage.** Use only the features available to your assigned role. Attempting to access another role's data or features is a breach of these Terms.",
          "**5. AI assistant.** The Aura AI assistant answers using only your school's data, within your role's scope. Queries that attempt to extract data outside your scope are blocked and logged. Do not use the assistant to extract data for unauthorized purposes.",
          "**6. Data requests.** Requests to export or delete your data must go through your campus admin. We do not honor requests received outside this process.",
          "**7. Report accuracy.** When reporting issues or disputes, provide accurate information. Knowingly false reports may result in account review.",
          "**8. Compliance.** Your use of Aura must comply with your school's policies on attendance, conduct, and IT use. Violations are addressed by your school under its own disciplinary processes.",
          "**9. Service availability.** Aura aims for high availability but does not guarantee uninterrupted service. We may schedule maintenance and respond to incidents that briefly affect availability.",
          "**10. Changes.** We may update these Terms. Material changes will be announced in the app and via email at least 30 days before taking effect. Continued use after the effective date constitutes acceptance.",
          "**11. Termination.** Your school may terminate your access. You may stop using Aura at any time. Some records (attendance, audit logs) may be retained as required by school policy.",
          "**12. Liability.** Aura is provided on an \"as is\" basis. To the maximum extent permitted by law, we are not liable for indirect or consequential damages arising from use of the service."
        ]
      }
    ]
  },
  {
    id: "contact",
    label: "Contact Support",
    blurb: "Reach the team behind Aura.",
    articles: [
      {
        id: "contact-flow",
        title: "Who to contact first",
        excerpt: "Most questions are fastest to answer at your school.",
        body: [
          "Account access issues, role assignments, missing events, and attendance disputes are handled by your campus admin or school IT — they can resolve most cases the same day.",
          "Technical issues that look like platform bugs (crashes, data inconsistencies, repeated failures) should be reported to your campus admin first; they escalate to the Aura platform team if needed."
        ]
      },
      {
        id: "report-bug",
        title: "Reporting a bug or crash",
        excerpt: "Include the right details.",
        body: [
          "When reporting a bug: include your role, your school, the exact screen, what you tried to do, what happened, your device model, and your app version. A screenshot speeds resolution.",
          "Send to your campus admin (preferred) or the support email below."
        ]
      },
      {
        id: "feedback",
        title: "Sending product feedback",
        excerpt: "Feature requests and suggestions.",
        body: [
          "We genuinely want your feedback. Use the feedback button on the Aura site (the modal that appears on first visit), email the support address, or message any of the team members listed on the home page's Team section.",
          "We read every message and act on the recurring ones."
        ]
      },
      {
        id: "support-email",
        title: "Support email",
        excerpt: "When all else fails.",
        body: [
          "Email auraautomessage@gmail.com with a detailed description of your issue. Include the items from \"Reporting a bug\" above.",
          "We respond to most messages within a few hours during the school week. Outside school hours, expect a reply the next business day."
        ]
      }
    ]
  }
];

export const POPULAR_TOPICS = [
  { label: "Sign in", categoryId: "getting-started", articleId: "first-sign-in" },
  { label: "Face scan", categoryId: "attendance", articleId: "check-in-steps" },
  { label: "Reset password", categoryId: "account", articleId: "forgot-password" },
  { label: "Install Android", categoryId: "getting-started", articleId: "install-android" },
  { label: "Geofence", categoryId: "attendance", articleId: "geofence" },
  { label: "Privacy", categoryId: "privacy", articleId: "data-isolation" }
];
