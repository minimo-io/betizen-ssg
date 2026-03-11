// public/js/core/cms.js
// Handle CMS API UI, using the api.js at public/js/core/api.js
window.BZ.cms = {
    async init(){
        console.log("JS_CMS Cubiq SDK initiated...")
    },

    // Handle the actual commenting
    async handleCommenting(button){
        console.log("Commenting...");

        // alert(`${getTranslation("texts.soon")}`)

        if (!window.BZ.state.get("auth.isAuthenticated")) {
            window.BZ.auth.showLoginModal();
            return;
        }

        

        // const entityId = button.dataset.entityId;
        // const karma = button.dataset.karma;
    }
}