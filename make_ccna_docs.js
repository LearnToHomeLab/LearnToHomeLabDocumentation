const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join('C:', 'Users', 'lego7', 'Desktop', 'my-website', 'docs', 'CCNA - Cisco');

// Comprehensive topic-specific dataset mapped directly to CCNA 200-301 Blueprint & Exam Cram
const EPISODE_DATABASE = {
  1: {
    title: "First Contact & Cisco IOS Modes",
    summary: "Establish console terminal access and navigate User EXEC vs Privileged EXEC modes.",
    objectives: [
      {
        title: "Connect to a New Switch via Out-of-Band Console",
        desc: "Establish physical communication using a rollover or USB console cable connected to the switch's RJ-45 or USB mini-B console port at 9600-8-N-1 settings.",
        use: "Required when unboxing brand new equipment or recovering a device with no network connectivity."
      },
      {
        title: "Differentiate User EXEC and Privileged EXEC Modes",
        desc: "User EXEC (indicated by `>`) permits non-disruptive monitoring. The `enable` command transitions to Privileged EXEC (indicated by `#`), granting access to full device diagnostics and configuration commands.",
        use: "Forms the security boundary between everyday monitoring and administrative management."
      },
      {
        title: "Explore the Command Landscape with Context-Sensitive Help",
        desc: "Typing `?` displays available commands per mode; typing `sh?` lists keywords beginning with 'sh'.",
        use: "Essential for discovering syntax variations and parameters directly on the live CLI."
      }
    ],
    cmd: "Switch> enable\nSwitch# show version\nSwitch# show privilege\nSwitch# disable",
    show: "show privilege"
  },
  2: {
    title: "Switch Hostname & Running Config",
    summary: "Assign unique device hostnames and audit the active configuration in volatile RAM.",
    objectives: [
      {
        title: "Configure System Hostname According to RFC and Enterprise Naming Standards",
        desc: "The `hostname <name>` global configuration command defines system identity across CLI prompts, syslog events, and CDP neighbors.",
        use: "Applied as the foundational step to identify physical switches in racks, CLI prompts, and syslog output."
      },
      {
        title: "Inspect Active Dynamic State in Volatile DRAM",
        desc: "The running-config represents the immediate, operational state running in volatile memory.",
        use: "Audited using `show running-config` or pipe filters like `show running-config | include hostname` to confirm active settings before saving."
      }
    ],
    cmd: "Switch# configure terminal\nSwitch(config)# hostname SW-CAMPUS-ACC01\nSW-CAMPUS-ACC01(config)# end",
    show: "show running-config | include hostname"
  },
  3: {
    title: "Reading CLI Errors & The Do Command",
    summary: "Parse IOS syntax error markers and run Privileged EXEC inspection commands from config mode.",
    objectives: [
      {
        title: "Interpret the Cisco IOS Caret (^) Error Locator",
        desc: "When a command contains a typo, Cisco IOS outputs `% Invalid input detected at '^' marker`, pointing an arrow directly under the first invalid character.",
        use: "Pinpoints syntax typos and unrecognized tokens instantly."
      },
      {
        title: "Resolve Incomplete and Ambiguous Command Errors",
        desc: "`% Incomplete command` indicates missing required parameters; `% Ambiguous command` indicates non-unique abbreviations.",
        use: "Teaches operators how to supply mandatory parameters or supply sufficient unique characters."
      },
      {
        title: "Finish Incomplete Commands using Context-Sensitive Help",
        desc: "Append `?` directly to incomplete commands to see remaining required arguments or optional keywords.",
        use: "Allows engineers to complete complex multi-parameter commands without checking documentation."
      },
      {
        title: "Unlock Privileged Show Commands from Config Mode with 'do'",
        desc: "Prefixing commands with `do` (e.g. `do show ip interface brief`) executes Privileged EXEC commands from within any configuration sub-mode without exiting.",
        use: "Saves time during repetitive configuration and verification cycles."
      }
    ],
    cmd: "Switch(config)# interface gi0/1\nSwitch(config-if)# do show ip interface brief\nSwitch(config-if)# do show vlan brief",
    show: "do show ip interface brief"
  },
  4: {
    title: "Navigating Cisco CLI Modes",
    summary: "Transition cleanly between Global, Interface, Sub-interface, Line, and Router sub-modes.",
    objectives: [
      {
        title: "Differentiate Configuration Sub-Modes and Prompts",
        desc: "IOS utilizes distinct prompts for context: `(config-if)#` for interfaces, `(config-line)#` for VTY/console, `(config-router)#` for routing processes.",
        use: "Ensures configuration commands are applied to the intended subsystem."
      },
      {
        title: "Master Hierarchy Step-Back Semantics (exit vs end vs Ctrl+Z)",
        desc: "`exit` steps back one hierarchical level; `end` and `Ctrl+Z` return immediately to Privileged EXEC.",
        use: "Optimizes operational speed when jumping out of deeply nested interface configurations."
      }
    ],
    cmd: "Switch# configure terminal\nSwitch(config)# interface GigabitEthernet0/1\nSwitch(config-if)# exit\nSwitch(config)# line vty 0 4\nSwitch(config-line)# end",
    show: "show running-config | section line vty"
  },
  5: {
    title: "CLI Shortcuts & Tab Auto-Complete",
    summary: "Leverage CLI keystroke shortcuts, history buffers, and command abbreviations.",
    objectives: [
      {
        title: "Apply Keyboard Editing Shortcuts (Ctrl+A, Ctrl+E, Ctrl+U)",
        desc: "`Ctrl+A` moves to start of line; `Ctrl+E` moves to end; `Ctrl+U` clears the entire line.",
        use: "Accelerates command writing and editing in production terminal environments."
      },
      {
        title: "Recall and Filter CLI History Buffers",
        desc: "The up-arrow or `Ctrl+P` recalls prior commands stored in the per-session history buffer.",
        use: "Enables fast re-execution of repetitive verification commands."
      },
      {
        title: "Master Safe Command Abbreviations",
        desc: "Commands require only enough letters to uniquely identify them from the command dictionary (e.g. `conf t`, `sh run`, `int gi0/1`).",
        use: "Standard enterprise operational practice during fast-paced switch configuration."
      }
    ],
    cmd: "Switch# terminal history size 50\nSwitch# show history\nSwitch# conf t\nSwitch(config)# int gi0/1\nSwitch(config-if)# no shut",
    show: "show history"
  },
  6: {
    title: "Inspecting Switch VLANs & Port State",
    summary: "Inspect normal-range VLAN databases and audit Layer 2 physical port assignments.",
    objectives: [
      {
        title: "Analyze Normal-Range VLAN Assignments in the Factory Default State",
        desc: "By default, all switchports belong to VLAN 1 (the default data and management VLAN).",
        use: "Used to determine broadcast domain boundaries and identify unassigned ports."
      },
      {
        title: "Inspect Reserved Legacy VLANs (1002 - 1005)",
        desc: "VLANs 1002-1005 are reserved for legacy FDDI and Token Ring protocols and cannot be deleted.",
        use: "Critical for understanding reserved identifiers in normal-range switching."
      },
      {
        title: "Differentiate Access Ports from Trunk Links in VLAN Output",
        desc: "Access ports show up explicitly in `show vlan brief`; trunk ports do not because they carry all VLANs.",
        use: "Essential audit step to prevent traffic leakage across isolated broadcast domains."
      }
    ],
    cmd: "Switch# show vlan brief\nSwitch# show interfaces status\nSwitch# show vlan id 1",
    show: "show vlan brief"
  },
  7: {
    title: "Creating & Removing VLANs (The No Command)",
    summary: "Provision custom VLAN broadcast domains and understand the 'no' command lifecycle.",
    objectives: [
      {
        title: "Create and Name Custom Department VLANs",
        desc: "The `vlan <id>` global configuration command creates a broadcast domain; `name <string>` assigns an organizational label.",
        use: "Segment departments (Engineering, Finance, Guests) to restrict Layer 2 broadcasts."
      },
      {
        title: "Confirm VLAN Creation in the Active Database",
        desc: "Verify that new VLANs appear in `show vlan brief` with active status after exiting `config-vlan` mode.",
        use: "Validates that VLAN definitions are committed to `vlan.dat` in Flash memory."
      },
      {
        title: "Decommission Broadcast Domains using 'no vlan <id>'",
        desc: "Removing a VLAN deletes it from `vlan.dat` stored in Flash memory.",
        use: "Applied when repurposing campus switch networks or cleaning legacy configurations."
      },
      {
        title: "Analyze Orphaned Access Ports on Deleted VLANs",
        desc: "Access ports assigned to a deleted VLAN become orphaned and cease forwarding traffic until reassigned to an active VLAN.",
        use: "Key troubleshooting check when endpoints suddenly lose network connectivity."
      }
    ],
    cmd: "Switch# configure terminal\nSwitch(config)# vlan 10\nSwitch(config-vlan)# name Engineering\nSwitch(config-vlan)# vlan 20\nSwitch(config-vlan)# name Sales\nSwitch(config-vlan)# exit\nSwitch(config)# no vlan 20\nSwitch(config)# end",
    show: "show vlan brief"
  },
  8: {
    title: "Reading Interface Status & No Shutdown",
    summary: "Differentiate Layer 1 link state from Layer 2 protocol state and enable ports.",
    objectives: [
      {
        title: "Differentiate Physical Carrier Detect (Status) and Line Protocol",
        desc: "`Status` indicates Layer 1 electrical/optical signal; `Protocol` indicates Layer 2 framing and keepalives.",
        use: "Used to pinpoint whether a link failure is physical cabling (L1) or config/clocking (L2)."
      },
      {
        title: "Control Administrative State with shutdown and no shutdown",
        desc: "`shutdown` places the interface in administratively down state; `no shutdown` enables it.",
        use: "Standard procedure to bring new endpoints online or isolate misbehaving ports."
      }
    ],
    cmd: "Switch# configure terminal\nSwitch(config)# interface GigabitEthernet0/1\nSwitch(config-if)# description Connection-to-PC1\nSwitch(config-if)# no shutdown\nSwitch(config-if)# end",
    show: "show ip interface brief"
  },
  9: {
    title: "Saving Configs: Running vs Startup",
    summary: "Persist operational changes from volatile RAM to permanent NVRAM storage.",
    objectives: [
      {
        title: "Compare Cisco Hardware Memory Architecture (RAM, NVRAM, Flash, ROM)",
        desc: "RAM stores running-config; NVRAM stores startup-config; Flash stores IOS images and `vlan.dat`.",
        use: "Essential for understanding where network state survives power cycles."
      },
      {
        title: "Commit Changes with 'copy running-config startup-config'",
        desc: "Copies the active RAM configuration to NVRAM so it reloads on bootup.",
        use: "Mandatory standard operating procedure following any verified change window."
      }
    ],
    cmd: "Switch# copy running-config startup-config\nDestination filename [startup-config]? [Enter]",
    show: "show startup-config"
  },
  10: {
    title: "Switch Baseline Audit (Test 1)",
    summary: "Audit a misconfigured switch: resolve hostname, provision VLANs, restore ports, and save state.",
    objectives: [
      {
        title: "Audit a Misconfigured Switch Baseline",
        desc: "Inspect active configuration, interface line states, and VLAN allocations to detect configuration discrepancies.",
        use: "Conducted during network staging, site turn-ups, and practical exam challenges."
      },
      {
        title: "Correct Device Hostname to Enterprise Naming Standard",
        desc: "Deploy the correct `hostname <name>` command to align prompt identity with corporate standards.",
        use: "Establishes accurate switch identification across monitoring tools and logs."
      },
      {
        title: "Provision Required Broadcast Domains in the VLAN Database",
        desc: "Instantiate missing department VLANs and assign appropriate descriptive tags.",
        use: "Prepares the access layer for host IP segmentation."
      },
      {
        title: "Restore Administratively Disabled Desk Ports",
        desc: "Locate the disabled access port, assign it to the required VLAN, and bring it up with `no shutdown`.",
        use: "Restores network connectivity to user workstations."
      },
      {
        title: "Commit Baseline Configuration to NVRAM",
        desc: "Execute `copy run start` to ensure the repaired baseline configuration persists across reboots.",
        use: "Guarantees operational continuity in production environments."
      }
    ],
    cmd: "Switch# configure terminal\nSwitch(config)# hostname SW-FLOOR1\nSW-FLOOR1(config)# vlan 10\nSW-FLOOR1(config-vlan)# name Accounting\nSW-FLOOR1(config-vlan)# exit\nSW-FLOOR1(config)# interface GigabitEthernet0/1\nSW-FLOOR1(config-if)# switchport mode access\nSW-FLOOR1(config-if)# switchport access vlan 10\nSW-FLOOR1(config-if)# no shutdown\nSW-FLOOR1(config-if)# end\nSW-FLOOR1# copy run start",
    show: "show interfaces status"
  },
  11: {
    title: "Configuring a MOTD Login Banner",
    summary: "Configure legal notice Message of the Day banners using standard delimiters.",
    objectives: [
      {
        title: "Explain Legal Notice Requirements for Network Infrastructure",
        desc: "Banners must warn that unauthorized access is strictly prohibited and monitored.",
        use: "Prevents attackers from claiming authorized access in legal prosecution proceedings."
      },
      {
        title: "Configure MOTD Banners using the Delimiter Syntax",
        desc: "The `banner motd <char>` command encloses multi-line text between matching delimiter tokens (e.g. #).",
        use: "Standard security hardening applied across all routers, switches, and firewalls."
      },
      {
        title: "Verify Banner Injection in the Running Configuration",
        desc: "Confirm the banner string displays accurately in `show running-config | section banner`.",
        use: "Ensures the legal notice renders correctly across terminal sessions."
      }
    ],
    cmd: "Switch# configure terminal\nSwitch(config)# banner motd #\n****************************************************\n* AUTHORIZED ACCESS ONLY. ALL SESSIONS MONITORED.  *\n* VIOLATORS WILL BE PROSECUTED.                    *\n****************************************************#\nSwitch(config)# end",
    show: "show running-config | section banner motd"
  },
  12: {
    title: "Setting an Enable Password",
    summary: "Configure legacy enable passwords and analyze cleartext password exposure risks.",
    objectives: [
      {
        title: "Configure Privileged Access using 'enable password'",
        desc: "The legacy `enable password <string>` command protects entry to Privileged EXEC mode.",
        use: "Maintained for backward compatibility on legacy Cisco devices."
      },
      {
        title: "Examine Configuration Dumps and Cleartext Exposure",
        desc: "`enable password` stores secrets in unencrypted plaintext in the running-config file.",
        use: "Demonstrates vulnerability to shoulder surfing and compromised backup dumps."
      }
    ],
    cmd: "Switch# configure terminal\nSwitch(config)# enable password CiscoLegacyPass123\nSwitch(config)# end\nSwitch# disable\nSwitch> enable",
    show: "show running-config | include enable"
  },
  13: {
    title: "Enable Secret & Console Port Lock",
    summary: "Deploy cryptographically hashed secrets and enforce physical console authentication.",
    objectives: [
      {
        title: "Implement Strong Password Hashing with 'enable secret'",
        desc: "`enable secret <pass>` stores passwords as one-way hashes (MD5, SHA-256, or Scrypt).",
        use: "Industry standard requirement for securing the Privileged EXEC mode boundary."
      },
      {
        title: "Secure Physical Line Console Access (line con 0)",
        desc: "Configuring a password and `login` under line con 0 forces credential checks on physical console cables.",
        use: "Secures network hardware against unauthorized on-site physical terminal attachment."
      }
    ],
    cmd: "Switch# configure terminal\nSwitch(config)# enable secret CiscoSecure!2026\nSwitch(config)# line con 0\nSwitch(config-line)# password ConsoleLock#1\nSwitch(config-line)# login\nSwitch(config-line)# exec-timeout 5 0\nSwitch(config-line)# logging synchronous\nSwitch(config-line)# end",
    show: "show running-config | section line con"
  },
  14: {
    title: "Configuring VTY Lines for Remote Access",
    summary: "Provision virtual teletype (VTY) lines for remote management across lines 0 to 15.",
    objectives: [
      {
        title: "Configure Remote Access on Virtual Terminal (VTY) Lines",
        desc: "Access `line vty 0 15` on switches or `line vty 0 4` on routers to manage inbound remote sessions.",
        use: "Enables administrative management over IP networks."
      },
      {
        title: "Apply Shared VTY Passwords and Inactivity Timeouts",
        desc: "Configure `password <pass>`, enable `login`, and set `exec-timeout 10 0` to disconnect abandoned sessions.",
        use: "Secures remote access lines and prevents session hijacking."
      }
    ],
    cmd: "Switch# configure terminal\nSwitch(config)# line vty 0 15\nSwitch(config-line)# password RemoteVtyPass!99\nSwitch(config-line)# login\nSwitch(config-line)# exec-timeout 10 0\nSwitch(config-line)# logging synchronous\nSwitch(config-line)# end",
    show: "show running-config | section line vty"
  },
  15: {
    title: "Local Users & Login Local Security",
    summary: "Deploy individual administrator accounts and enforce local database validation.",
    objectives: [
      {
        title: "Create Local User Accounts with Hashed Secrets",
        desc: "Provision unique credentials using `username <name> privilege 15 secret <pass>` in global configuration mode.",
        use: "Enforces non-repudiation and role-based access control."
      },
      {
        title: "Migrate Management Lines to 'login local'",
        desc: "Apply `login local` under `line con 0` and `line vty 0 15` to instruct the CLI to query the local username database.",
        use: "Replaces vulnerable shared line passwords with individualized authentication."
      }
    ],
    cmd: "Switch# configure terminal\nSwitch(config)# username admin privilege 15 secret SuperAdminKey#1\nSwitch(config)# line con 0\nSwitch(config-line)# login local\nSwitch(config-line)# exit\nSwitch(config)# line vty 0 15\nSwitch(config-line)# login local\nSwitch(config-line)# end",
    show: "show running-config | include username"
  },
  16: {
    title: "Pre-Deployment Access Audit (Test 2)",
    summary: "Audit device access controls, enforce password encryption, and verify line lockdown.",
    objectives: [
      {
        title: "Audit Management Plane Hardening",
        desc: "Verify that all console and VTY lines enforce `login local`, synchronous logging, and strict inactivity timeouts.",
        use: "Pre-flight security checklist before connecting switches to enterprise LANs."
      },
      {
        title: "Deploy 'service password-encryption' to Obfuscate Passwords",
        desc: "`service password-encryption` applies a Type 7 reversible cipher to cleartext line passwords.",
        use: "Prevents casual observation of passwords in configuration dumps."
      },
      {
        title: "Validate Remote Authentication and Save Final Baseline",
        desc: "Test authentication from remote terminals and commit changes to NVRAM with `copy run start`.",
        use: "Ensures compliance and persistence across production maintenance windows."
      }
    ],
    cmd: "Switch# configure terminal\nSwitch(config)# service password-encryption\nSwitch(config)# line con 0\nSwitch(config-line)# exec-timeout 5 0\nSwitch(config-line)# login local\nSwitch(config-line)# line vty 0 15\nSwitch(config-line)# exec-timeout 5 0\nSwitch(config-line)# login local\nSwitch(config-line)# end\nSwitch# copy run start",
    show: "show running-config | section line"
  },
  17: {
    title: "Build Your First Switch Baseline (Exam)",
    summary: "Capstone exam for Stage 1: Build a complete production switch baseline from zero.",
    objectives: [
      {
        title: "Synthesize Complete Device Management Baseline",
        desc: "Integrate hostname, MOTD legal banner, enable secret, local admin account, and encrypted passwords.",
        use: "Standard staging template executed on every switch before rack deployment."
      },
      {
        title: "Enforce Multi-Line Security Controls",
        desc: "Lock console and all 16 VTY lines using `login local`, `exec-timeout 5 0`, and `logging synchronous`.",
        use: "Prevents unauthorized local physical access and remote session hijacking."
      },
      {
        title: "Perform Final Baseline Verification and NVRAM Commit",
        desc: "Audit the running configuration and execute `copy running-config startup-config`.",
        use: "Guarantees complete disaster recovery readiness upon power failure."
      }
    ],
    cmd: "Switch# configure terminal\nSwitch(config)# hostname SW-ACCESS-BASE01\nSW-ACCESS-BASE01(config)# enable secret CiscoSecureCCNA!2026\nSW-ACCESS-BASE01(config)# username netadmin privilege 15 secret AdminKey#99\nSW-ACCESS-BASE01(config)# service password-encryption\nSW-ACCESS-BASE01(config)# banner motd #AUTHORIZED ACCESS ONLY#\nSW-ACCESS-BASE01(config)# line con 0\nSW-ACCESS-BASE01(config-line)# login local\nSW-ACCESS-BASE01(config-line)# exec-timeout 5 0\nSW-ACCESS-BASE01(config-line)# logging synchronous\nSW-ACCESS-BASE01(config-line)# line vty 0 15\nSW-ACCESS-BASE01(config-line)# login local\nSW-ACCESS-BASE01(config-line)# exec-timeout 5 0\nSW-ACCESS-BASE01(config-line)# logging synchronous\nSW-ACCESS-BASE01(config-line)# end\nSW-ACCESS-BASE01# copy run start",
    show: "show running-config"
  },
  18: {
    title: "Configuring & Verifying SSH (Exam)",
    summary: "Turn a console-only switch into one you can administer remotely: build the full SSH stack.",
    objectives: [
      {
        title: "Construct the Complete Cisco IOS SSHv2 Stack",
        desc: "Configure 1) Hostname, 2) IP domain-name, 3) Local user, 4) 2048-bit RSA keys with `crypto key generate rsa`, 5) `ip ssh version 2`.",
        use: "Replaces cleartext Telnet with cryptographically encrypted remote management."
      },
      {
        title: "Lock Down Inbound VTY Transport to SSH Only",
        desc: "Apply `transport input ssh` across all VTY lines to explicitly block cleartext Telnet traffic on TCP port 23.",
        use: "Enforces enterprise compliance policies mandating encrypted in-transit management."
      },
      {
        title: "Verify Remote Session Encryption from PC Terminal",
        desc: "Establish an SSH session from a host PC (`ssh -l <user> <ip>`) and inspect status with `show ip ssh` and `show ssh`.",
        use: "Validates functional encrypted reachability from network endpoints."
      }
    ],
    cmd: "Switch# configure terminal\nSwitch(config)# hostname SW-CORE-SSH\nSW-CORE-SSH(config)# ip domain-name cisco.com\nSW-CORE-SSH(config)# username secadmin privilege 15 secret SSHSecureKey#1\nSW-CORE-SSH(config)# crypto key generate rsa modulus 2048\nSW-CORE-SSH(config)# ip ssh version 2\nSW-CORE-SSH(config)# line vty 0 15\nSW-CORE-SSH(config-line)# login local\nSW-CORE-SSH(config-line)# transport input ssh\nSW-CORE-SSH(config-line)# end",
    show: "show ip ssh"
  }
};

function getDynamicObjectives(epNum, titleText) {
  if (epNum <= 35) {
    return [
      {
        title: `Analyze ${titleText} Protocols & Physical Standards`,
        desc: `Examine the underlying RFC definitions, cabling specifications, mathematical conversions, or encapsulation standards governing ${titleText}.`,
        use: `Essential for designing high-performance enterprise cabling, addressing schemes, and campus infrastructures.`
      },
      {
        title: `Evaluate Packet Headers and Protocol Interactions`,
        desc: `Trace frame and packet headers across Layers 1 through 4 to understand protocol handshakes, addressing boundaries, and transmission parameters.`,
        use: `Used to predict traffic forwarding decisions and interpret network analyzer captures.`
      },
      {
        title: `Diagnose Layer 1 and Layer 2 Operational Faults`,
        desc: `Audit physical interface counters, duplex mismatches, and address resolution failures using Cisco IOS diagnostic commands.`,
        use: `Primary troubleshooting workflow when resolving link flapping, packet drops, or endpoint isolation.`
      }
    ];
  } else if (epNum <= 79) {
    return [
      {
        title: `Understand ${titleText} Layer 2 Switching Mechanics`,
        desc: `Master how campus switches process frames, populate CAM tables, insert 802.1Q tags, elect Spanning Tree roots, or bundle EtherChannels.`,
        use: `Deployed across campus access and distribution layers to provide high-bandwidth, loop-free Layer 2 forwarding.`
      },
      {
        title: `Configure ${titleText} on Cisco Catalyst Switches`,
        desc: `Implement production-grade Cisco IOS commands across interface ranges, VLAN databases, trunk links, and port-channel bundles.`,
        use: `Applied during campus provisioning to enforce VLAN segmentation, trunk security, and link aggregation.`
      },
      {
        title: `Verify Operational State and Isolate Switching Faults`,
        desc: `Inspect operational status using targeted show commands to detect native VLAN mismatches, STP port blocking, or negotiation failures.`,
        use: `Critical for eliminating switching loops, broadcast storms, and unexpected err-disable port lockouts.`
      }
    ];
  } else if (epNum <= 102) {
    return [
      {
        title: `Master ${titleText} Routing Architecture & Path Selection`,
        desc: `Analyze how routers evaluate routing tables, longest prefix match logic, administrative distance, and link-state OSPF algorithms.`,
        use: `Enables reliable inter-VLAN routing, multi-router backbone transit, and Internet default gateway reachability.`
      },
      {
        title: `Configure ${titleText} on Cisco Routers and Layer 3 Switches`,
        desc: `Deploy static routes, switch virtual interfaces (SVIs), OSPF single-area processes, or IPv6 unicast forwarding syntax.`,
        use: `Provisions scalable, deterministic packet forwarding across multi-site enterprise topologies.`
      },
      {
        title: `Troubleshoot Routing Loops and Asymmetric Drops`,
        desc: `Trace next-hop reachability, diagnose missing network advertisements, and verify neighbor adjacencies.`,
        use: `Required to resolve packet blackholes, routing loops, and dynamic protocol peering drops.`
      }
    ];
  } else if (epNum <= 121) {
    return [
      {
        title: `Analyze ${titleText} Security Defenses and Threat Vectors`,
        desc: `Evaluate network defense mechanisms: Port Security, DHCP Snooping, Dynamic ARP Inspection, ACL packet filtering, AAA, and device hardening.`,
        use: `Protects campus and perimeter infrastructure against rogue devices, MAC spoofing, ARP cache poisoning, and unauthorized access.`
      },
      {
        title: `Implement ${titleText} Hardening Commands on Cisco IOS`,
        desc: `Configure security syntax on access ports, VTY lines, and routing interfaces to enforce access policies.`,
        use: `Mandatory security hardening required across all enterprise network environments.`
      },
      {
        title: `Audit Security Bindings and Resolve Filter Drops`,
        desc: `Verify dynamic binding databases, inspect ACL hit counters, and audit violation recovery timers.`,
        use: `Ensures comprehensive protection without blocking legitimate production traffic flows.`
      }
    ];
  } else {
    return [
      {
        title: `Understand ${titleText} in Network Automation and SDN`,
        desc: `Explore centralized controller architecture (Cisco Catalyst Center), REST APIs, JSON encoding, and configuration management.`,
        use: `Replaces error-prone manual box-by-box CLI administration with centralized, programmatic intent-based networking.`
      },
      {
        title: `Interpret Telemetry Payloads and REST-Based Interactions`,
        desc: `Examine JSON key-value pairs, arrays, HTTP verbs (GET, POST, PUT, DELETE), status codes, and RESTCONF URIs.`,
        use: `Used by modern network engineers to query device operational state and push automated configurations at scale.`
      },
      {
        title: `Evaluate Idempotency, Configuration Drift, and AIOps`,
        desc: `Compare Ansible playbooks against imperative scripting, and analyze predictive AI telemetry anomalies.`,
        use: `Ensures deterministic configuration compliance across multi-vendor enterprise infrastructure.`
      }
    ];
  }
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const ALL_EPISODES = [
  "Ep 01: First Contact & Cisco IOS Modes",
  "Ep 02: Switch Hostname & Running Config",
  "Ep 03: Reading CLI Errors & The Do Command",
  "Ep 04: Navigating Cisco CLI Modes",
  "Ep 05: CLI Shortcuts & Tab Auto-Complete",
  "Ep 06: Inspecting Switch VLANs & Port State",
  "Ep 07: Creating & Removing VLANs (The No Command)",
  "Ep 08: Reading Interface Status & No Shutdown",
  "Ep 09: Saving Configs: Running vs Startup",
  "Ep 10: Switch Baseline Audit (Test 1)",
  "Ep 11: Configuring a MOTD Login Banner",
  "Ep 12: Setting an Enable Password",
  "Ep 13: Enable Secret & Console Port Lock",
  "Ep 14: Configuring VTY Lines for Remote Access",
  "Ep 15: Local Users & Login Local Security",
  "Ep 16: Pre-Deployment Access Audit (Test 2)",
  "Ep 17: Build Your First Switch Baseline (Exam)",
  "Ep 18: Configuring & Verifying SSH (Exam)",
  "Ep 19: Enterprise Network Terminology & Roles",
  "Ep 20: Routers vs Switches vs Firewalls",
  "Ep 21: Tracing an Internet Packet: DNS to Server",
  "Ep 22: Network Topologies & Failure Domains",
  "Ep 23: Copper vs Fiber Cabling & Transceivers",
  "Ep 24: Power over Ethernet (PoE) Budgets",
  "Ep 25: Diagnosing Layer 1 Interface Counters",
  "Ep 26: MAC Address Structure & Hexadecimal",
  "Ep 27: Switch Forwarding: Forward, Flood, Filter",
  "Ep 28: How ARP Resolves IP to MAC Addresses",
  "Ep 29: IPv4 Binary Math & Octet Structure",
  "Ep 30: Subnet Masks & CIDR Prefix Boundaries",
  "Ep 31: VLSM Subnetting Made Fast & Simple",
  "Ep 32: IPv6 Address Architecture & Compression",
  "Ep 33: IPv6 Address Types & Modified EUI-64",
  "Ep 34: IPv6 Neighbor Discovery Protocol (NDP)",
  "Ep 35: TCP vs UDP: Handshakes & Reliability",
  "Ep 36: Reading the Switchport Status Map",
  "Ep 37: Interface Descriptions & Config Slices",
  "Ep 38: Port Admin State: Shutdown vs Notconnect",
  "Ep 39: Troubleshooting a Silent Access Port",
  "Ep 40: Disabling Unused Ports (Interface Range)",
  "Ep 41: Auditing Link Speed & Duplex Settings",
  "Ep 42: Ethernet Framing & Layer 2 Header Walk",
  "Ep 43: Switch CAM Table: Source Learning Logic",
  "Ep 44: Watching the MAC Address Table Populate",
  "Ep 45: Filtering MAC Evidence by VLAN & Port",
  "Ep 46: ARP Cache vs Switch MAC Table",
  "Ep 47: Layer 2 Segmentation: Same vs Diff VLAN",
  "Ep 48: VLANs as Broadcast Domains Explained",
  "Ep 49: Creating & Naming Campus VLANs",
  "Ep 50: Provisioning Department VLAN Databases",
  "Ep 51: Diagnosing & Repairing a Broken VLAN DB",
  "Ep 52: VLAN Foundations Lab Challenge (Exam 1)",
  "Ep 53: Configuring Static Access Switchports",
  "Ep 54: Bulk VLAN Assignment (Interface Range)",
  "Ep 55: Verifying Same-VLAN Host Delivery",
  "Ep 56: Troubleshooting Access Port VLAN Mismatch",
  "Ep 57: Auditing Switchport Admin vs Oper State",
  "Ep 58: Access Port Provisioning Test (Exam 2)",
  "Ep 59: Access Ports vs 802.1Q Trunks Explained",
  "Ep 60: Building Your First 802.1Q Trunk Link",
  "Ep 61: Tracing Tagged Frames Across Switches",
  "Ep 62: Trunk Allowed VLAN Lists (Avoiding Drops)",
  "Ep 63: Hardening the Native VLAN on Trunks",
  "Ep 64: Diagnosing Native VLAN Mismatch Errors",
  "Ep 65: Fixing Missing VLANs on Trunk Links",
  "Ep 66: 802.1Q Trunking Hands-Off Test (Exam 3)",
  "Ep 67: Why Layer 2 Switching Loops Crash LANs",
  "Ep 68: Reading Spanning Tree Roles & States",
  "Ep 69: Migrating to Rapid PVST+ (802.1w)",
  "Ep 70: Setting STP Primary & Backup Root Bridges",
  "Ep 71: STP PortFast for Fast Endpoint Access",
  "Ep 72: STP BPDU Guard & Edge Port Protection",
  "Ep 73: EtherChannel: Aggregating Switch Links",
  "Ep 74: Configuring LACP EtherChannel (Mode Active)",
  "Ep 75: LACP Negotiation Modes: Active vs Passive",
  "Ep 76: Fixing Port-Channel Negotiation Errors",
  "Ep 77: Testing EtherChannel Link Failover",
  "Ep 78: STP & LACP Bundle Challenge (Exam 4)",
  "Ep 79: Full Campus Switch Network Capstone",
  "Ep 80: Fixing 169.254 APIPA Address Failures",
  "Ep 81: Troubleshooting Wrong Subnet Masks",
  "Ep 82: Addressing Hosts Using VLSM Subnet Plans",
  "Ep 83: Inter-VLAN Routing with Switch SVIs",
  "Ep 84: Adding a Default Route Gateway",
  "Ep 85: Connecting LANs with Static Routes",
  "Ep 86: Static Routing Across Three Routers",
  "Ep 87: Troubleshooting Asymmetric Ping Drops",
  "Ep 88: Finding & Breaking a Static Routing Loop",
  "Ep 89: Initializing IPv6 Routing on Cisco IOS",
  "Ep 90: Static Routing with Next-Hop IPv6",
  "Ep 91: Diagnosing & Fixing IPv6 Routing Loops",
  "Ep 92: IPv6 SLAAC & Router Advertisements",
  "Ep 93: Configuring IPv6 EUI-64 Auto-Addressing",
  "Ep 94: Configuring Single-Area OSPFv2",
  "Ep 95: Troubleshooting Missing OSPF Networks",
  "Ep 96: Scaling Dynamic OSPF to Three Routers",
  "Ep 97: Injecting Default Routes into OSPF",
  "Ep 98: Floating Static Backup Routes (AD 200)",
  "Ep 99: Routed Layer 3 EtherChannel on Routers",
  "Ep 100: Layer 3 EtherChannel on Switches",
  "Ep 101: Hub-and-Spoke Static Routing (Exam)",
  "Ep 102: Three-Router OSPF Backbone Capstone",
  "Ep 103: Switch Console & Enable Secret Security",
  "Ep 104: Securing VTY Lines & Idle Timeouts",
  "Ep 105: Deploying SSHv2 & Disabling Telnet",
  "Ep 106: Local User Privilege Levels 1 vs 15",
  "Ep 107: Setting Legal Login Banners (MOTD)",
  "Ep 108: Switch Port Security & Sticky MACs",
  "Ep 109: Port Security Modes: Protect vs Shutdown",
  "Ep 110: Auto Err-Disable Recovery Timers",
  "Ep 111: Defending LANs with DHCP Snooping",
  "Ep 112: Stopping ARP Spoofing with DAI",
  "Ep 113: Hardening Trunks & Disabling DTP",
  "Ep 114: Edge Defense: PortFast & BPDU Guard",
  "Ep 115: Filtering Subnets with Standard ACLs",
  "Ep 116: Building & Editing Standard Named ACLs",
  "Ep 117: Filtering Ports & Services with Extended ACLs",
  "Ep 118: Restricting VTY Lines with Access-Class",
  "Ep 119: Cisco AAA Local Authentication Setup",
  "Ep 120: Centralized AAA with RADIUS & TACACS+",
  "Ep 121: Branch Switch Security Hardening Capstone",
  "Ep 122: Reading Switch JSON Telemetry Payloads",
  "Ep 123: Parsing Nested JSON Arrays & Objects",
  "Ep 124: REST APIs: HTTP Verbs, CRUD & Status",
  "Ep 125: Switch RESTCONF URIs & Authentication",
  "Ep 126: CLI Management vs Controller-Based SDN",
  "Ep 127: SDN Control Planes, Overlays & APIs",
  "Ep 128: Ansible & Terraform: Drift & Idempotency",
  "Ep 129: AI & Machine Learning in NetOps (AIOps)",
  "Ep 130: Network Automation Final Checkpoint"
];

fs.mkdirSync(TARGET_DIR, { recursive: true });

let count = 0;

for (let i = 0; i < ALL_EPISODES.length; i++) {
  const epNum = i + 1;
  const rawTitle = ALL_EPISODES[i];

  const cleanTitle = rawTitle.replace(/\s*\|\s*ccna\s+masterclass\s*$/i, '').trim();
  const titleText = cleanTitle.replace(/^Ep\s+\d+:\s+/, '').trim();

  let epData;
  if (EPISODE_DATABASE[epNum]) {
    epData = EPISODE_DATABASE[epNum];
  } else {
    epData = {
      title: titleText,
      summary: `Master the operational principles, configuration syntax, and verification workflows for ${titleText}.`,
      objectives: getDynamicObjectives(epNum, titleText),
      cmd: epNum <= 35 ? "! Verification and evidence collection\nRouter# show interfaces\nRouter# show ip arp" :
           epNum <= 79 ? "! Switch configuration\nSwitch(config)# interface GigabitEthernet0/1\nSwitch(config-if)# switchport mode access" :
           epNum <= 102 ? "! Routing configuration\nRouter(config)# router ospf 1\nRouter(config-router)# network 10.0.0.0 0.255.255.255 area 0" :
           epNum <= 121 ? "! Security configuration\nSwitch(config-if)# switchport port-security\nSwitch(config-if)# switchport port-security violation shutdown" :
           "! Programmatic API call\ncurl -k -u 'admin:password' -X GET https://192.168.1.1/restconf/data/ietf-interfaces:interfaces",
      show: epNum <= 35 ? "show interfaces" :
            epNum <= 79 ? "show vlan brief" :
            epNum <= 102 ? "show ip route" :
            epNum <= 121 ? "show port-security interface gi0/1" :
            "show running-config | include restconf"
    };
  }

  // Ensure normalized objectives array format
  if (!epData.objectives && epData.obj1) {
    epData.objectives = [
      { title: epData.obj1, desc: epData.desc1, use: epData.use1 },
      { title: epData.obj2, desc: epData.desc2, use: epData.use2 }
    ];
    if (epData.obj3) {
      epData.objectives.push({ title: epData.obj3, desc: epData.desc3, use: epData.use3 });
    }
  }

  const slug = `ep-${String(epNum).padStart(2, '0')}-${slugify(titleText)}`;
  const filename = `${slug}.mdx`;
  const filepath = path.join(TARGET_DIR, filename);

  const objectivesList = epData.objectives.map((obj, idx) => `${idx + 1}. ${obj.title}`).join('\n');

  const objectivesSections = epData.objectives.map((obj, idx) => {
    let extraBlock = '';
    if (idx === 0) {
      extraBlock = `\n\n<InfoBox emoji="📌" title="Key Exam Concept">\n  Review protocol interactions, default timers, and packet/frame header fields before deploying this feature in production.\n</InfoBox>`;
    } else if (idx === 1 && epData.cmd) {
      extraBlock = `\n\n\`\`\`cisco\n${epData.cmd}\n\`\`\`\n\n| Verification Command | Purpose & Key Output Fields to Inspect |\n| :--- | :--- |\n| \`${epData.show}\` | Verify operational status, administrative flags, and active state |\n\n\`\`\`cisco\nDevice# ${epData.show}\n! Confirm operational readiness and healthy state\n\`\`\``;
    } else if (idx === epData.objectives.length - 1) {
      extraBlock = `\n\n<WarningBox>\n  Always verify that configuration changes are committed to NVRAM using 'copy running-config startup-config'. Mismatched parameters, unassigned VLANs, or missing 'no shutdown' commands will disrupt link forwarding.\n</WarningBox>`;
    }

    return `### ${obj.title}\n> ${obj.desc}\n\n${obj.use}${extraBlock}`;
  }).join('\n\n');

  const doc = `---
sidebar_position: ${epNum}
---
import WarningBox from '/src/components/HomepageFeatures/WarningBox';
import InfoBox from '/src/components/HomepageFeatures/InfoBox';
import DocImage from '/src/components/HomepageFeatures/DocImage';

# ${cleanTitle}

<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }}
>
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</div>

## Don't Forget To Use Our Link
[If you kinds find this course useful and want 10% off your first year, use our link to sign up for 10% off!](https://switchlab.dev/learntohomelab)

## ${titleText}
In this episode, we focus on **${titleText}**. We examine the core networking principles, Cisco IOS CLI syntax, verification show commands, and common troubleshooting traps according to the official CCNA 200-301 certification blueprint.

<InfoBox emoji="ℹ️" title="Throughout this course">
  During each episode, you will see the topology map with a red box highlighting the specific device or segment being configured. Follow along carefully with the CLI syntax shown below.
</InfoBox>

## Learning Objectives
${objectivesList}

${objectivesSections}

## Follow Us on Social Media
[YouTube](https://www.youtube.com/@learntohomelab)  
[Discord](https://discord.gg/6MsHSJWZpH)  
[Apparel](https://shop.learntohomelab.com/)   
[Patreon](https://www.patreon.com/c/learntohomelab)  
[Reddit](https://www.reddit.com/r/learntohomelab/)  
[Rumble](https://rumble.com/c/c-7585051)
`;

  fs.writeFileSync(filepath, doc, 'utf8');
  count++;
  console.log(`[${String(count).padStart(3, '0')}/130] Created: ${filename}`);
}

console.log(`\nSUCCESS: Generated all ${count} files cleanly in ${TARGET_DIR}`);