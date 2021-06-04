let addProductModal = {};
let deleteModal = {};
import pagination from "./pagination.js";
const productModalArea = {
  data() {
    return {
      imageFile: ""
    }
  },
  props: ["products", "prompt", "tempData", "showStatus", "isUpImg"],
  mounted() {
    const modal = document.querySelector(".productModal");
    addProductModal = new bootstrap.Modal(modal, { backdrop: 'static', keyboard: false });
  },
  methods: {
    closeModal() {
      console.log("closeModal");
      this.$emit("close-modal", "addProductModal");
      this.imageFile = "";
    },
    addData() {
      console.log("addData");
      this.$emit("add-data", "addData")
    },
    editData(editId) {
      console.log("editData", editId);
      this.$emit("edit-data", 'editData', editId)
    },
    changeStatus(status, btn) {
      this.imageFile = "";
      console.log("changeStatus", this[status]);
      this.$emit("change-status", status);
      console.log(this[status]);
    },
    getFile(e) {
      this.imageFile = e.target.files[0];
      console.log(this.imageFile);
    },
    uploadImage() {
      console.log(this.imageFile === "");
      console.log("uploadImage");
      this.$emit("upload-image", this.imageFile);
      this.imageFile = "";
      console.log(this.imageFile);
    }
  },
  template: `<div class="modal fade productModal"  tabindex="-1">
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
                <input type="text" id="origin_price" name="origin_price" placeholder="請輸入原價"
                  v-model.number="tempData.origin_price">
              </div>
              <div class="formGroup">
                <label for="price">售價<span v-text="prompt.price"></span></label>
                <input type="text" id="price" name="price" placeholder="請輸入售價" v-model.number="tempData.price">
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
const deleteModalArea = {
  props: ["deleteId"],
  methods: {
    closeModal() {
      console.log("close");
      this.$emit("close-modal", 'deleteModal')
    },
    deleteData(id) {
      console.log("delete", id, this.deleteId);
      this.$emit("delete-data", id)
    }
  },
  mounted() {
    const modal = document.querySelector(".deleteModal");
    deleteModal = new bootstrap.Modal(modal);
  },
  template: `<div class="modal fade deleteModal" id="exampleModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">刪除確認</h5>
        <button type="button" class="btn-close btn-close-white" @click="closeModal('deleteModal')"></button>
      </div>
      <div class="modal-body">
        <p class="my-2">商品刪除後將無法復原，確定要刪除商品？</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal('deleteModal')">取消</button>
        <button type="button" class="btn btn-danger" @click="deleteData(deleteId)">刪除</button>
      </div>
    </div>
  </div>
</div>`
}
const app = {
  data() {
    return {
      url: "https://vue3-course-api.hexschool.io/",
      path: "jun0527",
      products: [],
      page: "",
      constraints: {
        title: {
          presence: {
            message: "必填！"
          }
        },
        category: {
          presence: {
            message: "必填！"
          }
        },
        imageUrl: {
          presence: {
            message: "必填！"
          },
          url: {
            message: "圖片網址錯誤！"
          }
        },
        description: {
          presence: {
            message: "必填！"
          }
        },
        origin_price: {
          presence: {
            message: "必填！"
          },
          numericality: {
            greaterThan: 0
          }
        },
        price: {
          presence: {
            message: "必填！"
          },
          numericality: {
            greaterThan: 0
          }
        },
        unit: {
          presence: {
            message: "必填！"
          }
        }
      },
      prompt: {
        title: "",
        category: "",
        imageUrl: "",
        description: "",
        origin_price: "",
        price: "",
        unit: "",
      },
      tempData: {
        title: "",
        category: "",
        imageUrl: "",
        description: "",
        origin_price: "",
        price: "",
        unit: "",
        is_enabled: ""
      },
      showStatus: {
        addData: true,
        editData: false
      },
      id: {
        editId: "",
        deleteId: ""
      },
      isUpImg: false
    }
  },
  components: {
    pagination,
    productModalArea,
    deleteModalArea
  },
  methods: {
    init(page = 1) {
      console.log("init", page);
      axios.get(`${this.url}api/${this.path}/admin/products?page=${page}`)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.page = res.data.pagination;
          }
        })
        .catch((err) => {
          console.dir(err);
        })
    },
    //互動視窗
    showModal(modal, status, id, index) {
      this.modalStatus = status;
      if (status === "editData") {
        this.showStatus.addData = false;
        this.showStatus.editData = false;
        this.id.editId = id;
        this.tempData = { ...this.products[index] };
      } else if (status === "addData") {
        this.showStatus.editData = false;
        this.showStatus.addData = true;
      } else {
        this.id.deleteId = id;
      }
      if (status === "deleteData") {
        deleteModal.show();
      } else {
        addProductModal.show();
      }
    },
    closeModal(modal) {
      this.clearArrayData("tempData");
      if (modal === "addProductModal") {
        addProductModal.hide();
      } else {
        deleteModal.hide();
      }
    },
    changeStatus(status) {
      this[status] = !this[status];
    },
    uploadImage(file) {
      console.log(file);
      let formData = new FormData();
      formData.append("file-to-upload", file)
      axios.post(`${this.url}api/${this.path}/admin/upload`, formData)
        .then((res) => {
          if (res.data.success) {
            console.log(res);
            this.tempData.imageUrl = res.data.imageUrl;
            this.isUpImg = false;
          }
        })
        .catch((err) => {
          console.dir(err);
        })
    },
    addDataValidate(status, id) {
      console.log(status, id);
      const addProductFrom = document.querySelector(".addProduct");
      this.clearArrayData("prompt");
      let err = validate(addProductFrom, this.constraints);
      if (this.tempData.origin_price < this.tempData.price) {
        this.prompt.price = "售價不可小於原價！"
        return;
      }
      if (err === undefined) {
        if (status === "addData") {
          this.addProduct();
        } else {
          this.editProductData(id);
        }
        return;
      } else {
        let attribute = Object.keys(err);
        attribute.forEach((key) => {
          let message = err[key][0].split(" ").pop();
          this.prompt[key] = message;
        })
      }
    },
    addProduct() {
      if (this.tempData.is_enabled) {
        this.tempData.is_enabled = 1;
      } else {
        this.tempData.is_enabled = 0;
      }
      let obj = {
        data: { ...this.tempData }
      }
      console.log(obj);
      axios.post(`${this.url}api/${this.path}/admin/product`, obj)
        .then((res) => {
          if (res.data.success) {
            alert("商品建立成功！");
            this.closeModal('addProductModal');
            this.init();
          } else {
            console.log(res.data);
            alert("商品建立失敗！");
          }
        })
        .catch((err) => {
          console.dir(err);
        })
    },
    editProductData(id) {
      console.log("editData", id);
      let obj = {
        data: { ...this.tempData }
      }
      console.log(obj);
      axios.put(`${this.url}api/${this.path}/admin/product/${id}`, obj)
        .then((res) => {
          if (res.data.success) {
            alert("修改商品資料成功！");
            this.closeModal('addProductModal');
            this.init();
          } else {
            alert("修改商品資料失敗！");
          }
        })
        .catch((err) => {
          console.dir(err);
        })
    },
    clearArrayData(arrayName) {
      this[arrayName].title = "";
      this[arrayName].category = "";
      this[arrayName].imageUrl = "";
      this[arrayName].description = "";
      this[arrayName].origin_price = "";
      this[arrayName].price = "";
      this[arrayName].unit = "";
      if (arrayName === "tempData") {
        this.tempData.is_enabled = "";
        this.isUpImg = false;
      }
    },
    changeEnabled(id, index) {
      let obj = {
        data: { ...this.products[index] }
      };
      if (obj.data.is_enabled === 0) {
        obj.data.is_enabled = 1;
        this.isChecked = "checked";
      } else {
        obj.data.is_enabled = 0;
        this.isChecked = "disabled";
      }
      axios.put(`${this.url}api/${this.path}/admin/product/${id}`, obj)
        .then((res) => {
          if (res.data.success) {
            alert("已更改商品啟用狀態！");
            this.init();
          } else {
            alert("更改商品啟用狀態失敗！");
          }
        })
        .catch((err) => {
          console.dir(err);
        })
    },
    deleteProduct(id) {
      console.log(id);
      axios.delete(`${this.url}api/${this.path}/admin/product/${id}`)
        .then((res) => {
          if (res.data.success) {
            alert("產品刪除成功！");
            deleteModal.hide();
            this.init();
          } else {
            console.log(res);
            alert("產品刪除失敗！");
            deleteModal.hide();
          }
        })
        .catch((err) => {
          console.dir(err);
        })
    },
  },
  mounted() {
    let token = document.cookie.replace(/(?:(?:^|.*;\s*)signInCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.init();
  }
}
Vue.createApp(app).mount("#app");