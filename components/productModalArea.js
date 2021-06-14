export default {
  data() {
    return {
      imageFile: "",
      addProductModal: {}
    }
  },
  props: ["products", "prompt", "tempData", "showStatus", "isUpImg"],
  mounted() {
    this.addProductModal = new bootstrap.Modal(this.$refs.modal, { backdrop: 'static', keyboard: false });
  },
  methods: {
    openModal() {
      this.addProductModal.show();
    },
    closeModal() {
      this.$emit("close-modal", "addProductModal");
      this.imageFile = "";
      this.addProductModal.hide();
    },
    addData() {
      this.$emit("add-data", "addData")
    },
    editData(editId) {
      this.$emit("edit-data", 'editData', editId)
    },
    changeStatus(status, btn) {
      this.imageFile = "";
      this.$emit("change-status", status);
    },
    getFile(e) {
      this.imageFile = e.target.files[0];
    },
    uploadImage() {
      this.$emit("upload-image", this.imageFile);
      this.imageFile = "";
    }
  },
  template: `<div ref="modal" class="modal fade productModal"  tabindex="-1">
    <div class="modal-dialog addProductArea">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title">商品建立</h5>
          <button type="button" class="btn-close btn-close-white" @click="closeModal"></button>
        </div>
        <div class="modal-body d-flex">
          <form action="index.html" class="addProduct js-addProduct">
            <div class="formGroup">
              <label for="title">商品名稱<span v-text="prompt.title"></span></label>
              <input type="text" id="title" name="title" placeholder="請輸入商品名稱" v-model="tempData.title">
            </div>
            <div class="formGroup">
              <label for="category">商品分類<span v-text="prompt.category"></span></label>
              <select id="category" name="category" v-model="tempData.category">
                <option value="" selected disabled>請選擇分類</option>
                <option value="蛋糕">蛋糕</option>
                <option value="餅乾">餅乾</option>
                <option value="泡芙">泡芙</option>
                <option value="其他">其他</option>
              </select>
            </div>
            <div class="formGroup">
              <label for="imageUrl">商品圖片<button type="button" class="btn isUploadImageBtn" @click="changeStatus('isUpImg')" v-if="!isUpImg">上傳圖片</button><span v-text="prompt.imageUrl"></span></label>
              <div class="upImgArea" v-if="isUpImg">
                <input type="file" class="upImage" id="upImage" @change="getFile">
                <div class="btnArea">
                  <button type="button" class="upImageBtn" @click="uploadImage" :disabled="imageFile===''?true:false">上傳圖片</button>
                  <button type="button" class="upImageBtn cancelBtn" @click="changeStatus('isUpImg','cancel')">取消</button>
                </div>
              </div>
              <input type="text" id="imageUrl" name="imageUrl" placeholder="請輸入圖片網址或上傳圖片" v-model="tempData.imageUrl" :disabled="isUpImg">
            </div>
            <div class="formGroup">
              <label for="description">商品描述<span v-text="prompt.description"></span></label>
              <textarea type="text" id="description" name="description" placeholder="請輸入商品描述"
                v-model="tempData.description"></textarea>
            </div>
            <div class="priceArea">
              <div class="formGroup">
                <label for="origin_price">原價<span v-text="prompt.origin_price"></span></label>
                <input type="number" id="origin_price" name="origin_price" placeholder="請輸入原價"
                  v-model.number="tempData.origin_price">
              </div>
              <div class="formGroup">
                <label for="price">售價<span v-text="prompt.price"></span></label>
                <input type="number" id="price" name="price" placeholder="請輸入售價" v-model.number="tempData.price">
              </div>
              <div class="formGroup">
                <label for="unit">單位<span v-text="prompt.unit"></span></label>
                <input type="text" id="unit" name="unit" placeholder="請輸入單位(如：個)" v-model="tempData.unit">
              </div>
            </div>
            <div class="formGroup" v-if="showStatus.addData">
              <input type="checkbox" id="is_enabled" name="is_enabled" value="1" v-model="tempData.is_enabled">
              <label for="is_enabled">是否啟用</label>
            </div>
          </form>
          <div class="previewPictureArea">
            <h2 class="title">圖片預覽</h2>
            <div class="previewPicture">
              <img :src="tempData.imageUrl" alt="圖片預覽">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">取消</button>
          <button type="button" class="btn btn-primary" v-if="showStatus.addData"
            @click="addData">建立</button>
          <button type="button" class="btn btn-primary" v-else="showStatus.addData"
            @click="editData(tempData.id)">編輯</button>
        </div>
      </div>
    </div>
  </div>`
}