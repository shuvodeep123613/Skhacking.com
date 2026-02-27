// টুলসের তালিকা (ছবির সাথে মিলিয়ে)
const tools = [
    // Generators
    { name: "CC Generator", category: "generators", description: "Generate valid credit card numbers for testing", icon: "fa-credit-card" },
    { name: "BIN Generator", category: "generators", description: "Create BIN numbers with custom parameters", icon: "fa-hashtag" },
    { name: "Address Generator", category: "generators", description: "Create realistic fake addresses", icon: "fa-map-marker-alt" },
    
    // Checkers
    { name: "Live CC Checker", category: "checkers", description: "Validate credit card numbers in real-time", icon: "fa-check-circle" },
    { name: "CC - Stripe Auth", category: "checkers", description: "Check cards with Stripe authentication", icon: "fa-credit-card" },
    { name: "BIN Lookup", category: "checkers", description: "Find information about any BIN number", icon: "fa-search" },
    
    // Utilities
    { name: "GeoIP", category: "utilities", description: "Find information about any IP", icon: "fa-globe" },
    { name: "Auto phishing script make", category: "utilities", description: "Auto phishing script maker", icon: "fa-skull" },
    { name: "Script HUB", category: "utilities", description: "Auto phishing script make", icon: "fa-code" }
];

// টুলস রেন্ডার ফাংশন
function renderTools(category = 'all') {
    const container = document.getElementById('tools-container');
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
    
    // প্রতিটি বাটনে ক্লিক ইভেন্ট
    document.querySelectorAll('.use-tool-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const toolName = e.target.dataset.tool;
            handleToolClick(toolName);
        });
    });
}

// টুল ক্লিক করলে কী হবে (এখন সতর্কতা দেখাবে)
function handleToolClick(toolName) {
    alert(`আপনি "${toolName}" টুলটি ব্যবহার করতে চান।\nএই টুল শুধু পরীক্ষামূলক।`);
    // আপনি চাইলে এখানে প্রতিটি টুলের জন্য আলাদা ফাংশন কল করতে পারেন
}

// ক্যাটাগরি ট্যাবের ইভেন্ট
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // সক্রিয় ট্যাবের স্টাইল পরিবর্তন
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.remove('active', 'bg-blue-600', 'text-white');
            b.classList.add('bg-gray-700', 'text-gray-300');
        });
        e.target.classList.add('active', 'bg-blue-600', 'text-white');
        e.target.classList.remove('bg-gray-700', 'text-gray-300');
        
        const category = e.target.dataset.category;
        renderTools(category);
    });
});

// শুরুতে "All" ক্যাটাগরি দেখাও
renderTools();

// সার্চ ফাংশন
const searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const activeCategory = document.querySelector('.category-btn.active').dataset.category;
    
    let filtered = tools;
    if (activeCategory !== 'all') {
        filtered = tools.filter(t => t.category === activeCategory);
    }
    
    const searched = filtered.filter(t => 
        t.name.toLowerCase().includes(searchTerm) || 
        t.description.toLowerCase().includes(searchTerm)
    );
    
    // অস্থায়ীভাবে দেখানোর জন্য (ক্যাটাগরি বাটন রি-রেন্ডার না করেই)
    const container = document.getElementById('tools-container');
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
    
    // নতুন বাটনে ইভেন্ট লিসেনার যোগ
    document.querySelectorAll('.use-tool-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const toolName = e.target.dataset.tool;
            handleToolClick(toolName);
        });
    });
});