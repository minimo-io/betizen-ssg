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
        const entitySlug = button.dataset.entityId;
        // alert(`${getTranslation("texts.soon")}`);


        this.showCommentModal(postUuid, entitySlug);
    },


    showCommentModal(postUuid, entitySlug) {
        const commentFormHtml = `
        <div class="mx-auto max-w-full">
            <form id="bz-comment-form" class="space-y-4">
                <input type="hidden" name="post_id" value="${postUuid || ''}">
                <input type="hidden" name="entity_id" value="${entitySlug || ''}">

                <div>
                    <textarea 
                        name="body" 
                        placeholder="${getTranslation("texts.writeComment") || 'Write your comment...'}" 
                        class="textarea textarea-bordered w-full h-32 mb-2" 
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

        const form = document.getElementById("bz-comment-form");
        const errorDiv = document.getElementById("comment-error");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const btn = document.getElementById("submit-comment-btn");
            const formData = new FormData(form);
            const payload = {
                post_id: formData.get("post_id"),
                body: formData.get("body")?.trim() // Trim to avoid whitespace-only comments
            };

            // --- Frontend Validation ---
            errorDiv.classList.add("hidden");
            errorDiv.innerText = "";

            // 1. UUID Validation (RFC4122)
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            
            if (!payload.post_id || !uuidRegex.test(payload.post_id)) {
                errorDiv.innerText = "Error: Invalid Post ID.";
                errorDiv.classList.remove("hidden");
                console.error("Validation Failed: Missing or invalid post_id UUID.");
                return;
            }

            // 2. Body String Validation
            if (!payload.body || payload.body.length < 3) {
                errorDiv.innerText = "Please write a comment (at least 3 characters).";
                errorDiv.classList.remove("hidden");
                return;
            }

            try {
                btn.disabled = true;
                btn.innerHTML = `<span class="loading loading-spinner"></span>`;

                await window.BZ.api.cms.comments.create(payload);

                window.BZ.modal.hide();
                console.log(`Comment success for: ${entitySlug}`);
                
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