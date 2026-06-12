// Aquavie's Blog - JavaScript

// 博客配置
const BLOG_CONFIG = {
    name: "Aquavie的{}随笔",
    owner: {
        fullName: "Aquavie·de·Fontaine",
        shortName: "Aquavie",
        bio: "青岛人 | 热爱计算机 | 业余无线电爱好者 | 飞友 | Minecraft玩家 | 原神/星铁/明日方舟玩家",
        location: "青岛",
        avatar: "A"
    },
    social: {
        github: "chezixiang",
        bilibili: "3537114281019643",
        email: "czx20101@outlook.com",
        qq: "1876963659"
    },
    categories: [
        { id: "tech", name: "技术分享", icon: "💻", color: "#6366f1" },
        { id: "life", name: "生活随笔", icon: "🌈", color: "#06b6d4" },
        { id: "minecraft", name: "MC", icon: "⛏️", color: "#22c55e" },
        { id: "alive", name: "活着真好", icon: "🌸", color: "#ec4899" },
        { id: "ham", name: "火腿", icon: "📻", color: "#f59e0b" },
        { id: "aviation", name: "飞友", icon: "✈️", color: "#3b82f6" }
    ],
    tags: [
        "C++", "Rust", "Python", "Java", "Web", "前端",
        "Minecraft", "原神", "星穹铁道", "明日方舟",
        "摄影", "读书", "杂食", "火腿", "飞友"
    ],
    dataPath: "data/posts.json"
};

// 默认示例文章（用于首次加载或数据文件不存在时）
const DEFAULT_ARTICLES = [
    {
        id: 1,
        title: "我的第一篇博客文章",
        category: "tech",
        tags: ["C++", "Rust"],
        date: "2024-01-15T10:30:00.000Z",
        excerpt: "欢迎来到我的博客！这是我的第一篇文章，未来我会在这里分享技术心得、生活感悟，以及作为一名业余无线电爱好者（火腿）和飞友的各种经历。",
        content: "欢迎来到我的博客！这是我的第一篇文章，未来我会在这里分享技术心得、生活感悟，以及作为一名业余无线电爱好者（火腿）和飞友的各种经历。\n\n作为一名热爱计算机的人，我平时主要使用C++、Rust和Python进行编程。如果你对这些技术感兴趣，欢迎和我交流！\n\n另外，我是一名Minecraft国际版玩家，目前主要玩1.20.1版本。如果你也是MC爱好者，可以加我好友一起玩~"
    },
    {
        id: 2,
        title: "关于我为什么开始写博客",
        category: "life",
        tags: ["生活", "杂食"],
        date: "2024-01-12T08:15:00.000Z",
        excerpt: "一直想找个地方记录自己的学习和成长，也想分享一些对生活的思考。博客是一个很好的选择，于是就有了这个网站。",
        content: "一直想找个地方记录自己的学习和成长，也想分享一些对生活的思考。博客是一个很好的选择，于是就有了这个网站。\n\n我是一个杂食的人，什么都感兴趣，什么都想尝试。虽然我的专业是计算机，但我对很多事情都充满好奇心。\n\n未来我会在这里分享：\n1. 技术学习和项目经验\n2. 游戏心得（Minecraft、原神、明日方舟等）\n3. 生活感悟和思考\n4. 可能还有一些摄影作品"
    },
    {
        id: 3,
        title: "Minecraft 1.20.1 服务器搭建记录",
        category: "minecraft",
        tags: ["Minecraft", "Java"],
        date: "2024-01-10T14:00:00.000Z",
        excerpt: "最近搭建了一个小型的Minecraft服务器，记录一下过程和一些遇到的问题。",
        content: "最近搭建了一个小型的Minecraft服务器，记录一下过程和一些遇到的问题。\n\n使用的版本是1.20.1，Paper服务端。整体来说比较顺利，但也遇到了一些小问题：\n\n1. 内存分配：建议分配4GB以上\n2. 端口转发：需要开放25565端口\n3. 插件安装：选择与版本兼容的插件\n\n欢迎喜欢MC的朋友来玩！"
    },
    {
        id: 4,
        title: "活着真好 - 心理健康随想",
        category: "alive",
        tags: ["生活", "杂食"],
        date: "2024-01-08T20:30:00.000Z",
        excerpt: "生活有时很难，但活着本身就是一件值得珍惜的事情。记录一下最近的心情和感悟。",
        content: "生活有时很难，但活着本身就是一件值得珍惜的事情。\n\n最近情绪有些波动，想在这里记录一下。其实每个人都有自己的难处，重要的是学会接纳自己，善待自己。\n\n给自己的话：\n- 不要太苛责自己\n- 每天进步一点点就好\n- 累了就休息，没关系的\n- 你已经很棒了！\n\n希望看到这篇文章的你也能好好照顾自己。"
    },
    {
        id: 5,
        title: "业余无线电备考日记",
        category: "ham",
        tags: ["火腿"],
        date: "2024-01-05T16:45:00.000Z",
        excerpt: "正在备考业余无线电执照，记录一下学习过程和一些知识点。",
        content: "正在备考业余无线电执照，记录一下学习过程和一些知识点。\n\n学习内容：\n1. 无线电基础知识\n2. 法律法规\n3. 操作规范\n4. 呼号规则\n\n考试时间还没确定（2026年还没组织考试...），但提前准备总是好的。\n\n期待拿到呼号的那一天！📻"
    }
];

// 文章管理类
class BlogManager {
    constructor() {
        this.articles = [];
        this.currentFilter = 'all';
    }

    // 从JSON文件加载文章
    async loadArticles() {
        try {
            const response = await fetch(BLOG_CONFIG.dataPath);
            if (response.ok) {
                this.articles = await response.json();
            } else {
                throw new Error('Failed to fetch articles');
            }
        } catch (error) {
            console.warn('Failed to load articles from JSON, using defaults:', error);
            this.articles = [...DEFAULT_ARTICLES];
        }
        return this.articles;
    }

    // 获取文章
    getArticle(id) {
        return this.articles.find(a => a.id === parseInt(id));
    }

    // 获取分类统计
    getCategoryStats() {
        const stats = {};
        this.articles.forEach(article => {
            stats[article.category] = (stats[article.category] || 0) + 1;
        });
        return stats;
    }

    // 格式化日期
    formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // 获取分类信息
    getCategoryById(categoryId) {
        return BLOG_CONFIG.categories.find(c => c.id === categoryId) || { name: categoryId, icon: "📝" };
    }
}

// 全局博客管理器实例
let blogManager;

// 初始化
document.addEventListener('DOMContentLoaded', async () => {
    blogManager = new BlogManager();
    await blogManager.loadArticles();
    initBlog();
});

// 初始化博客
function initBlog() {
    if (window.location.pathname.includes('admin.html')) {
        initAdmin();
    } else {
        initHome();
    }
}

// 初始化主页
function initHome() {
    renderArticles();
    renderSidebar();
    setupFilters();
    setupModal();
}

// 初始化管理后台
function initAdmin() {
    renderAdminArticles();
    setupAdminForm();
}

// 渲染文章列表
function renderArticles(filter = 'all') {
    const container = document.getElementById('blog-list');
    if (!container) return;

    let articles = blogManager.articles;

    if (filter !== 'all') {
        articles = articles.filter(a => a.category === filter);
    }

    if (articles.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <p>还没有文章</p>
            </div>
        `;
        return;
    }

    container.innerHTML = articles.map(article => {
        const category = blogManager.getCategoryById(article.category);
        return `
            <article class="blog-card" onclick="openArticle(${article.id})">
                <div class="blog-meta">
                    <span>📅 ${blogManager.formatDate(article.date)}</span>
                    <span class="blog-category">${category.icon} ${category.name}</span>
                </div>
                <h2 class="blog-title">${article.title}</h2>
                <p class="blog-excerpt">${article.excerpt}</p>
                <a href="#" class="read-more" onclick="event.stopPropagation(); openArticle(${article.id})">
                    阅读全文 →
                </a>
            </article>
        `;
    }).join('');
}

// 渲染侧边栏
function renderSidebar() {
    const profileWidget = document.getElementById('profile-widget');
    const categoriesWidget = document.getElementById('categories-widget');
    const tagsWidget = document.getElementById('tags-widget');

    if (profileWidget) {
        profileWidget.innerHTML = `
            <div class="profile">
                <div class="profile-avatar">${BLOG_CONFIG.owner.avatar}</div>
                <div class="profile-name">${BLOG_CONFIG.owner.shortName}</div>
                <p class="profile-bio">${BLOG_CONFIG.owner.bio}</p>
                <div class="social-links">
                    <a href="https://github.com/${BLOG_CONFIG.social.github}" target="_blank" title="GitHub">🐙</a>
                    <a href="https://space.bilibili.com/${BLOG_CONFIG.social.bilibili}" target="_blank" title="Bilibili">📺</a>
                    <a href="mailto:${BLOG_CONFIG.social.email}" title="邮箱">📧</a>
                    <a href="javascript:alert('QQ: ${BLOG_CONFIG.social.qq}')" title="QQ">💬</a>
                </div>
            </div>
        `;
    }

    if (categoriesWidget) {
        const stats = blogManager.getCategoryStats();
        categoriesWidget.innerHTML = `
            <h3>📚 文章分类</h3>
            <ul class="category-list">
                <li><a href="#" onclick="filterByCategory('all'); return false;">全部文章 <span class="category-count">${blogManager.articles.length}</span></a></li>
                ${BLOG_CONFIG.categories.map(cat => `
                    <li><a href="#" onclick="filterByCategory('${cat.id}'); return false;">${cat.icon} ${cat.name} <span class="category-count">${stats[cat.id] || 0}</span></a></li>
                `).join('')}
            </ul>
        `;
    }

    if (tagsWidget) {
        tagsWidget.innerHTML = `
            <h3>🏷️ 热门标签</h3>
            <div class="tag-cloud">
                ${BLOG_CONFIG.tags.map(tag => `<a href="#">${tag}</a>`).join('')}
            </div>
        `;
    }
}

// 设置筛选器
function setupFilters() {
    const tabsContainer = document.getElementById('filter-tabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = `
        <button class="filter-tab active" onclick="filterByCategory('all')">全部</button>
        ${BLOG_CONFIG.categories.map(cat => `
            <button class="filter-tab" onclick="filterByCategory('${cat.id}')">${cat.icon} ${cat.name}</button>
        `).join('')}
    `;
}

// 按分类筛选
function filterByCategory(category) {
    blogManager.currentFilter = category;

    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent.includes(BLOG_CONFIG.categories.find(c => c.id === category)?.name || '全部')) {
            tab.classList.add('active');
        }
        if (category === 'all' && tab.textContent === '全部') {
            tab.classList.add('active');
        }
    });

    renderArticles(category);
}

// 设置弹窗
function setupModal() {
    const modal = document.getElementById('article-modal');

    if (modal) {
        modal.onclick = (e) => {
            if (e.target === modal) closeModal();
        };
    }
}

// 打开文章
function openModal() {
    document.getElementById('article-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('article-modal').classList.remove('active');
    document.body.style.overflow = '';
}

function openArticle(id) {
    const article = blogManager.getArticle(id);
    if (!article) return;

    const category = blogManager.getCategoryById(article.category);
    const modal = document.getElementById('article-modal');

    modal.innerHTML = `
        <div class="modal-content article-view">
            <div class="modal-header">
                <h2>${article.title}</h2>
                <button class="modal-close" onclick="closeModal()">×</button>
            </div>
            <div class="article-header">
                <div class="article-meta">
                    📅 ${blogManager.formatDate(article.date)} &nbsp;|&nbsp;
                    ${category.icon} ${category.name} &nbsp;|&nbsp;
                    🏷️ ${article.tags.join(', ')}
                </div>
            </div>
            <div class="article-body">
                ${article.content.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '<br>').join('')}
            </div>
        </div>
    `;

    openModal();
}

// ==================== 管理后台功能 ====================

// 渲染管理后台文章列表
function renderAdminArticles() {
    const container = document.getElementById('admin-articles');
    if (!container) return;

    if (blogManager.articles.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <p>还没有文章，填写下方表单添加第一篇吧！</p>
            </div>
        `;
        return;
    }

    container.innerHTML = blogManager.articles.map(article => {
        const category = blogManager.getCategoryById(article.category);
        return `
            <div class="admin-article-item">
                <div class="admin-article-info">
                    <h3>${article.title}</h3>
                    <div class="admin-article-meta">
                        ${category.icon} ${category.name} &nbsp;|&nbsp;
                        📅 ${blogManager.formatDate(article.date)} &nbsp;|&nbsp;
                        🏷️ ${article.tags.join(', ')}
                    </div>
                </div>
                <div class="admin-article-actions">
                    <button class="admin-btn-edit" onclick="editArticle(${article.id})">编辑</button>
                    <button class="admin-btn-delete" onclick="confirmDelete(${article.id})">删除</button>
                </div>
            </div>
        `;
    }).join('');
}

// 设置管理表单
function setupAdminForm() {
    const form = document.getElementById('article-form');
    if (!form) return;

    const categorySelect = document.getElementById('article-category');
    if (categorySelect) {
        categorySelect.innerHTML = BLOG_CONFIG.categories.map(cat =>
            `<option value="${cat.id}">${cat.icon} ${cat.name}</option>`
        ).join('');
    }

    const tagsContainer = document.getElementById('article-tags');
    if (tagsContainer) {
        tagsContainer.innerHTML = BLOG_CONFIG.tags.map(tag => `
            <label class="tag-checkbox">
                <input type="checkbox" name="tags" value="${tag}"> ${tag}
            </label>
        `).join('');
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitArticle();
    });
}

// 提交文章
let editingArticleId = null;

function submitArticle() {
    const title = document.getElementById('article-title').value.trim();
    const category = document.getElementById('article-category').value;
    const excerpt = document.getElementById('article-excerpt').value.trim();
    const content = document.getElementById('article-content').value.trim();

    const tags = Array.from(document.querySelectorAll('input[name="tags"]:checked'))
        .map(cb => cb.value);

    if (!title || !category || !excerpt || !content) {
        alert('请填写所有必填项！');
        return;
    }

    if (editingArticleId !== null) {
        updateArticleInEditor(title, category, excerpt, content, tags);
    } else {
        addArticleToEditor(title, category, excerpt, content, tags);
    }
}

function addArticleToEditor(title, category, excerpt, content, tags) {
    const newArticle = {
        id: Date.now(),
        title,
        category,
        excerpt,
        content,
        tags,
        date: new Date().toISOString()
    };

    blogManager.articles.unshift(newArticle);
    exportToJson();

    document.getElementById('article-form').reset();
    renderAdminArticles();

    alert('文章已添加！\n\n接下来：\n1. 将生成的JSON内容复制到 data/posts.json 文件中\n2. 提交到GitHub即可发布');
}

function editArticle(id) {
    const article = blogManager.getArticle(id);
    if (!article) return;

    editingArticleId = id;

    document.getElementById('article-title').value = article.title;
    document.getElementById('article-category').value = article.category;
    document.getElementById('article-excerpt').value = article.excerpt;
    document.getElementById('article-content').value = article.content;

    document.querySelectorAll('input[name="tags"]').forEach(cb => {
        cb.checked = article.tags.includes(cb.value);
    });

    document.getElementById('article-form').scrollIntoView({ behavior: 'smooth' });

    const submitBtn = document.querySelector('#article-form button[type="submit"]');
    submitBtn.textContent = '更新文章';

    let cancelBtn = document.getElementById('cancel-edit-btn');
    if (!cancelBtn) {
        cancelBtn = document.createElement('button');
        cancelBtn.id = 'cancel-edit-btn';
        cancelBtn.type = 'button';
        cancelBtn.className = 'admin-btn-cancel';
        cancelBtn.textContent = '取消编辑';
        cancelBtn.onclick = cancelEdit;
        submitBtn.parentNode.insertBefore(cancelBtn, submitBtn);
    }
}

function updateArticleInEditor(title, category, excerpt, content, tags) {
    const index = blogManager.articles.findIndex(a => a.id === editingArticleId);
    if (index !== -1) {
        blogManager.articles[index] = {
            ...blogManager.articles[index],
            title,
            category,
            excerpt,
            content,
            tags
        };
        exportToJson();
    }

    cancelEdit();
    renderAdminArticles();

    alert('文章已更新！\n\n请将生成的JSON内容复制到 data/posts.json 文件中并提交到GitHub');
}

function cancelEdit() {
    editingArticleId = null;
    document.getElementById('article-form').reset();

    const submitBtn = document.querySelector('#article-form button[type="submit"]');
    submitBtn.textContent = '添加文章';

    const cancelBtn = document.getElementById('cancel-edit-btn');
    if (cancelBtn) cancelBtn.remove();
}

function confirmDelete(id) {
    if (confirm('确定要删除这篇文章吗？')) {
        blogManager.articles = blogManager.articles.filter(a => a.id !== id);
        exportToJson();
        renderAdminArticles();
        alert('文章已删除！请更新 data/posts.json 文件');
    }
}

// 导出到JSON显示区域
function exportToJson() {
    const jsonOutput = document.getElementById('json-output');
    if (jsonOutput) {
        jsonOutput.textContent = JSON.stringify(blogManager.articles, null, 2);
    }
}

// 复制JSON到剪贴板
function copyJson() {
    const jsonOutput = document.getElementById('json-output');
    const copyBtn = document.querySelector('.copy-json-btn');
    
    if (!jsonOutput || !copyBtn) return;

    navigator.clipboard.writeText(jsonOutput.textContent).then(() => {
        copyBtn.textContent = '✓ 已复制';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.textContent = '📋 一键复制';
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        alert('复制失败，请手动复制');
    });
}
