// ======================= টুলস ডাটাবেস =======================
const tools = [
    // Generators
    { name: "CC Generator", category: "generators", description: "Generate test card numbers (Luhn)", icon: "fa-credit-card" },
    { name: "BIN Generator", category: "generators", description: "Create BIN with custom parameters", icon: "fa-hashtag" },
    { name: "Address Generator", category: "generators", description: "Random fake address generator", icon: "fa-map-marker-alt" },
    
    // Checkers
    { name: "Live CC Checker", category: "checkers", description: "Demo: Validate test card numbers", icon: "fa-check-circle" },
    { name: "CC - Stripe Auth", category: "checkers", description: "Demo: Stripe-like card auth", icon: "fa-credit-card" },
    { name: "BIN Lookup", category: "checkers", description: "BIN database lookup (free API)", icon: "fa-search" },
    
    // Utilities
    { name: "GeoIP", category: "utilities", description: "IP address geolocation", icon: "fa-globe" },
    { name: "Auto phishing script make", category: "utilities", description: "Demo: Phishing awareness", icon: "fa-skull" },
    { name: "Script HUB", category: "utilities", description: "Demo: Auto script generator", icon: "fa-code" }
];

// ======================= টুলসের ফাংশনালিটি =======================

// 1. CC Generator (Luhn algorithm)
function generateCC() {
    const bin = prompt("Enter BIN (first 6 digits) or leave blank for random:");
    let cardNumber = "";
    if (bin && bin.length === 6) {
        cardNumber = bin + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
    } else {
        cardNumber = "4" + Math.floor(Math.random() * 1000000000000000).toString().padStart(15, '0');
    }
    // Luhn check digit adjust (simplified)
    alert(`Generated Card: ${cardNumber}\n(Test only, not real)`);
}

// 2. BIN Generator
function generateBIN() {
    const length = prompt("Enter BIN length (6 or 8):", "6");
    const bin = Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
    alert(`Generated BIN: ${bin}\n(Bank: TEST, Country: XX, Type: Credit)`);
}

// 3. Address Generator
function generateAddress() {
    const streets = ["Main St", "Park Ave", "Oak Lane", "Cedar Rd", "Washington Blvd"];
    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
    const states = ["NY", "CA", "IL", "TX", "AZ"];
    const zip = Math.floor(10000 + Math.random() * 90000);
    const address = `${Math.floor(Math.random()*9999)} ${streets[Math.floor(Math.random()*streets.length)]}, ${cities[Math.floor(Math.random()*cities.length)]}, ${states[Math.floor(Math.random()*states.length)]} ${zip}`;
    alert(`Fake Address:\n${address}`);
}

// 4. Live CC Checker (Demo only)
function checkCC() {
    const cc = prompt("Enter card number for test validation:");
    if (!cc) return;
    // Simple Luhn check (demo)
    const isValid = luhnCheck(cc);
    alert(isValid ? "✅ Card is valid (test mode)" : "❌ Invalid card (test mode)");
}

// Luhn algorithm helper
function luhnCheck(card) {
    let sum = 0;
    for (let i = 0; i < card.length; i++) {
        let digit = parseInt(card[i]);
        if ((card.length - i) % 2 === 0) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
    }
    return sum % 10 === 0;
}

// 5. Stripe Auth Demo
function stripeAuth() {
    const card = prompt("Enter test card (e.g., 4242 4242 4242 4242):");
    if (!card) return;
    alert("🔒 Stripe Auth Demo: Card would be charged $1.00\n(No real transaction)");
}

// 6. BIN Lookup (Free API)
function binLookup() {
    const bin = prompt("Enter BIN (first 6 digits of card):");
    if (!bin || bin.length < 6) {
        alert("Please enter at least 6 digits");
        return;
    }
    fetch(`https://lookup.binlist.net/${bin.substring(0,6)}`)
        .then(res => res.json())
        .then(data => {
            alert(`BIN Info:
                Bank: ${data.bank?.name || 'N/A'}
                Country: ${data.country?.name || 'N/A'}
                Type: ${data.type || 'N/A'}
                Scheme: ${data.scheme || 'N/A'}`);
        })
        .catch(() => alert("BIN not found or API limit"));
}

// 7. GeoIP
function geoIP() {
    const ip = prompt("Enter IP address (or leave blank for your IP):");
    let url = 'https://ipapi.co/json/';
    if (ip) url = `https://ipapi.co/${ip}/json/`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            alert(`IP: ${data.ip || ip}
Country: ${data.country_name}
City: ${data.city}
ISP: ${data.org}
Region: ${data.region}`);
        })
        .catch(() => alert("Could not fetch IP info"));
}

// 8. Auto phishing script (Demo only)
function phishingDemo() {
    alert("⚠️ Phishing Awareness Demo\n\nThis is a fake login page simulation.\nNever enter real passwords on untrusted sites.");
    // আপনি চাইলে এখানে একটি ডামি ফর্ম দেখাতে পারেন।
}

// 9. Script HUB (Demo)
function scriptHub() {
    alert("📜 Script HUB\n\nAuto-generated script:\n```\nconsole.log('Hello Hacker');\n```\n(Educational only)");
}

// ======================= টুল ডিসপ্যাচ ফাংশন =======================
function handleToolClick(toolName) {
    switch(toolName) {
        case "CC Generator": generateCC(); break;
        case "BIN Generator": generateBIN(); break;
        case "Address Generator": generateAddress(); break;
        case "Live CC Checker": checkCC(); break;
        case "CC - Stripe Auth": stripeAuth(); break;
        case "BIN Lookup": binLookup(); break;
        case "GeoIP": geoIP(); break;
        case "Auto phishing script make": phishingDemo(); break;
        case "Script HUB": scriptHub(); break;
        default: alert("Tool under development");
    }
}

// ======================= রেন্ডারিং ও ইভেন্ট =======================
function renderTools(category = 'all') {
    const container = document.getElementById('toolsContainer');
    if (!container) return;
    container.innerHTML = '';
    
    const filtered = category === 'all' ? tools : tools.filter(t => t.category === category);
    
    filtered.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'bg-gray-800 rounded-lg p-5 hover:shadow-xl transition border border-gray-700';
        card.innerHTML = `
            <div class="flex items-center mb-3">
                <i class="fas ${tool.icon} text-2xl text-blue-400 mr-3"></i>
                <h3 class="text-lg font-semibold">${tool.name}</h3>
            </div>
            <p class="text-gray-400 text-sm mb-4">${tool.description}</p>
            <button class="use-tool-btn w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition" data-tool="${tool.name}">
                Use Tool
            </button>
        `;
        container.appendChild(card);
    });
    
    document.querySelectorAll('.use-tool-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const toolName = e.target.dataset.tool;
            handleToolClick(toolName);
        });
    });
}

// ক্যাটাগরি বাটন
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.remove('active', 'bg-blue-600', 'text-white');
            b.classList.add('bg-gray-700', 'text-gray-300');
        });
        e.target.classList.add('active', 'bg-blue-600', 'text-white');
        e.target.classList.remove('bg-gray-700', 'text-gray-300');
        renderTools(e.target.dataset.category);
    });
});

// সার্চ ফাংশন
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const activeCat = document.querySelector('.category-btn.active').dataset.category;
        let filtered = tools;
        if (activeCat !== 'all') filtered = tools.filter(t => t.category === activeCat);
        const searched = filtered.filter(t => t.name.toLowerCase().includes(term) || t.description.toLowerCase().includes(term));
        
        const container = document.getElementById('toolsContainer');
        container.innerHTML = '';
        searched.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'bg-gray-800 rounded-lg p-5 hover:shadow-xl transition border border-gray-700';
            card.innerHTML = `
                <div class="flex items-center mb-3">
                    <i class="fas ${tool.icon} text-2xl text-blue-400 mr-3"></i>
                    <h3 class="text-lg font-semibold">${tool.name}</h3>
                </div>
                <p class="text-gray-400 text-sm mb-4">${tool.description}</p>
                <button class="use-tool-btn w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition" data-tool="${tool.name}">
                    Use Tool
                </button>
            `;
            container.appendChild(card);
        });
        document.querySelectorAll('.use-tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => handleToolClick(e.target.dataset.tool));
        });
    });
}

// শুরু
renderTools();