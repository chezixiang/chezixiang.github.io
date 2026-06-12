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
        bilibili: "@芙芙可爱吖awa",
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
        "摄影", "读书", "杂食"
    ]
};

// 默认示例文章
const DEFAULT_ARTICLES = [
    {
        id: 1,
        title: "我的第一篇博客文章",
        category: "tech",
        tags: ["C++", "Rust"],
        date: new Date().toISOString(),
        excerpt: "欢迎来到我的博客！这是我的第一篇文章，未来我会在这里分享技术心得、生活感悟，以及作为一名业余无线电爱好者（火腿）和飞友的各种经历。",
        content: "欢迎来到我的博客！这是我的第一篇文章，未来我会在这里分享技术心得、生活感悟，以及作为一名业余无线电爱好者（火腿）和飞友的各种经历。\n\n作为一名热爱计算机的人，我平时主要使用C++、Rust和Python进行编程。如果你对这些技术感兴趣，欢迎和我交流！\n\n另外，我是一名Minecraft国际版玩家，目前主要玩1.20.1版本。如果你也是MC爱好者，可以加我好友一起玩~"
    },
    {
        id: 2,
        title: "关于我为什么开始写博客",
        category: "life",
        tags: ["生活", "杂食"],
        date: new Date(Date.now() - 86400000).toISOString(),
        excerpt: "一直想找个地方记录自己的学习和成长，也想分享一些对生活的思考。博客是一个很好的选择，于是就有了这个网站。",
        content: "一直想找个地方记录自己的学习和成长，也想分享一些对生活的思考。博客是一个很好的选择，于是就有了这个网站。\n\n我是一个杂食的人，什么都感兴趣，什么都想尝试。虽然我的专业是计算机，但我对很多事情都充满好奇心。\n\n未来我会在这里分享：\n1. 技术学习和项目经验\n2. 游戏心得（Minecraft、原神、明日方舟等）\n3. 生活感悟和思考\n4. 可能还有一些摄影作品"
    },
    {
        id: 3,
        title: "Minecraft 1.20.1 服务器搭建记录",
        category: "minecraft",
        tags: ["Minecraft", "Java"],
        date: new Date(Date.now() - 172800000).toISOString(),
        excerpt: "最近搭建了一个小型的Minecraft服务器，记录一下过程和一些遇到的问题。",
        content: "最近搭建了一个小型的Minecraft服务器，记录一下过程和一些遇到的问题。\n\n使用的版本是1.20.1，Paper服务端。整体来说比较顺利，但也遇到了一些小问题：\n\n1. 内存分配：建议分配4GB以上\n2. 端口转发：需要开放25565端口\n3. 插件安装：选择与版本兼容的插件\n\n欢迎喜欢MC的朋友来玩！"
    }
];

// 文章管理类
class BlogManager {
    constructor() {
        this.articles = this.loadArticles();
        this.currentFilter = 'all';
    }

    // 从localStorage加载文章
    loadArticles() {
        const stored = localStorage.getItem('aquavie_blog_articles');
        if (stored) {
            return JSON.parse(stored);
        }
        // 如果没有数据，使用默认文章并保存
        this.saveArticles(DEFAULT_ARTICLES);
        return DEFAULT_ARTICLES;
    }

    // 保存文章到localStorage
    saveArticles(articles) {
        localStorage.setItem('aquavie_blog_articles', JSON.stringify(articles));
    }

    // 添加文章
    addArticle(article) {
        const newArticle = {
            ...article,
            id: Date.now(),
            date: new Date().toISOString()
        };
        this.articles.unshift(newArticle);
        this.saveArticles(this.articles);
        return newArticle;
    }

    // 更新文章
    updateArticle(id, updates) {
        const index = this.articles.findIndex(a => a.id === parseInt(id));
        if (index !== -1) {
            this.articles[index] = { ...this.articles[index], ...updates };
            this.saveArticles(this.articles);
            return this.articles[index];
        }
        return null;
    }

    // 删除文章
    deleteArticle(id) {
        this.articles = this.articles.filter(a => a.id !== parseInt(id));
        this.saveArticles(this.articles);
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
document.addEventListener('DOMContentLoaded', () => {
    blogManager = new BlogManager();
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
                <p>还没有文章，去看看管理后台添加一些吧！</p>
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

    // 更新标签样式
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
    const closeBtn = document.getElementById('modal-close');

    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

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

    // 填充分类选项
    const categorySelect = document.getElementById('article-category');
    if (categorySelect) {
        categorySelect.innerHTML = BLOG_CONFIG.categories.map(cat =>
            `<option value="${cat.id}">${cat.icon} ${cat.name}</option>`
        ).join('');
    }

    // 填充标签选项
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

    const article = { title, category, excerpt, content, tags };
    blogManager.addArticle(article);

    // 重置表单
    document.getElementById('article-form').reset();

    // 刷新列表
    renderAdminArticles();

    alert('文章发布成功！🎉');
}

// 编辑文章
let editingArticleId = null;

function editArticle(id) {
    const article = blogManager.getArticle(id);
    if (!article) return;

    editingArticleId = id;

    document.getElementById('article-title').value = article.title;
    document.getElementById('article-category').value = article.category;
    document.getElementById('article-excerpt').value = article.excerpt;
    document.getElementById('article-content').value = article.content;

    // 设置标签
    document.querySelectorAll('input[name="tags"]').forEach(cb => {
        cb.checked = article.tags.includes(cb.value);
    });

    // 滚动到表单
    document.getElementById('article-form').scrollIntoView({ behavior: 'smooth' });

    // 修改提交按钮
    const submitBtn = document.querySelector('#article-form button[type="submit"]');
    submitBtn.textContent = '更新文章';
    submitBtn.onclick = (e) => {
        e.preventDefault();
        updateArticle();
    };

    // 添加取消按钮
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

function updateArticle() {
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

    blogManager.updateArticle(editingArticleId, { title, category, excerpt, content, tags });

    cancelEdit();
    renderAdminArticles();

    alert('文章更新成功！✨');
}

function cancelEdit() {
    editingArticleId = null;
    document.getElementById('article-form').reset();

    const submitBtn = document.querySelector('#article-form button[type="submit"]');
    submitBtn.textContent = '发布文章';
    submitBtn.onclick = null;
    submitBtn.addEventListener('submit', (e) => {
        e.preventDefault();
        submitArticle();
    });

    const cancelBtn = document.getElementById('cancel-edit-btn');
    if (cancelBtn) cancelBtn.remove();
}

// 确认删除
function confirmDelete(id) {
    if (confirm('确定要删除这篇文章吗？删除后无法恢复。')) {
        blogManager.deleteArticle(id);
        renderAdminArticles();
        alert('文章已删除。');
    }
}

// 导出/导入功能
function exportData() {
    const data = JSON.stringify(blogManager.articles, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aquavie_blog_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data)) {
                blogManager.articles = data;
                blogManager.saveArticles(data);
                renderAdminArticles();
                alert('导入成功！共导入 ' + data.length + ' 篇文章。');
            } else {
                alert('文件格式不正确。');
            }
        } catch (err) {
            alert('文件读取失败：' + err.message);
        }
    };
    reader.readAsText(file);
}
