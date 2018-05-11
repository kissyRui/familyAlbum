module.exports = {
    
    about (ctx) {
        ctx.body = '<a href="/">首页</a>';
    },

    async index (ctx) {

        const res = await ctx.proxy({
            repos: 'github_api:repos/kissyRui/familyAlbum'
        });

        const repos = ctx.backData.repos;

        await ctx.render('template', {
            title: '家庭相册',
            url: repos.url
        });
    }
};