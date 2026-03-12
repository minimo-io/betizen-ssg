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

        

        // Pulling UUID for the API and slug for metadata/context
        const postUuid = button.dataset.postId; 
        const postSlug = button.dataset.postSlug;
        // alert(`${getTranslation("texts.soon")}`);


        this.showCommentModal(postUuid, postSlug);
    },

    showCommentModal(postUuid, postSlug) {
        const commentFormHtml = `
        <div class="mx-auto max-w-full">
            <form id="bz-comment-form" class="space-y-4">
                <input type="hidden" name="post_id" value="${postUuid || ''}">
                <input type="hidden" name="post_slug" value="${postSlug || ''}">
                <input type="hidden" name="recaptcha_token" id="recaptcha-token">

                <div>
                    <textarea 
                        name="body" 
                        placeholder="${getTranslation("texts.writeComment") || 'Write your comment...'}" 
                        class="textarea textarea-bordered border border-gray-300 w-full h-32 mb-2" 
                        required
                    ></textarea>
                    
                    <div id="comment-error" class="text-error text-sm mb-2 hidden"></div>
                    
                    <button type="submit" id="submit-comment-btn" class="btn btn-primary w-full text-white">
                        ${getTranslation("texts.leaveOpinion")}
                    </button>
                </div>
            </form>
        </div>
        `;

        window.BZ.modal.show({
            title: getTranslation("texts.leaveOpinion"),
            body: commentFormHtml,
        });

        // Load reCAPTCHA v3 script if not already loaded
        if (!document.getElementById('recaptcha-script')) {
            const script = document.createElement('script');
            script.id = 'recaptcha-script';
            script.src = 'https://www.google.com/recaptcha/api.js?render=6Lf3dYgsAAAAANNIN3gtVLGP0VMIjKIsWoVZ1iiG';
            document.head.appendChild(script);
        }

        const form = document.getElementById("bz-comment-form");
        const errorDiv = document.getElementById("comment-error");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const btn = document.getElementById("submit-comment-btn");
            const formData = new FormData(form);
            const payload = {
                post_slug: formData.get("post_slug"),
                body: formData.get("body")?.trim()
            };

            errorDiv.classList.add("hidden");
            errorDiv.innerText = "";

            if (!payload.post_slug) {
                errorDiv.innerText = "Error: Invalid post slug";
                errorDiv.classList.remove("hidden");
                console.error("Validation failed. No post_slug as reference.");
                return;
            }

            if (!payload.body || payload.body.length < 3) {
                errorDiv.innerText = "Please write a comment (at least 3 characters).";
                errorDiv.classList.remove("hidden");
                return;
            }

            try {
                btn.disabled = true;
                btn.innerHTML = `<span class="loading loading-spinner"></span>`;

                const recaptchaToken = await grecaptcha.execute('6Lf3dYgsAAAAANNIN3gtVLGP0VMIjKIsWoVZ1iiG', { action: 'comment' });
                payload.recaptcha_token = recaptchaToken;

                await window.BZ.api.cms.comments.create(payload);

                window.BZ.modal.close();

                showToast(
                    getTranslation("texts.commentPublished"),
                    "success",
                    5000,
                    "toast-center",
                    true
                );

                console.log(`Comment success for: ${payload.post_slug}`);

            } catch (error) {
                console.error("API Error:", error);
                errorDiv.innerText = error.message || "Failed to send comment.";
                errorDiv.classList.remove("hidden");
            } finally {
                btn.disabled = false;
                btn.innerText = getTranslation("texts.leaveOpinion");
            }
        });
    }
}