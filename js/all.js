let myModal = {};
import pagination from "./pagination.js";
const productModalArea = {
  props: ["products", "prompt", "tempData", "showStatus"],
  mounted() {
    const modal = document.querySelector(".productModal");
    myModal = new bootstrap.Modal(modal);
  },
  methods: {
    closeModal() {
      console.log("closeModal");
      this.$emit("close-modal")
    },
    addData() {
      console.log("addData");
      this.$emit("add-data", "addData")
    },
    editData(editId) {
      console.log("editData", editId);
      this.$emit("edit-data", 'editData', editId)
    }
  },
  template: `<div class="modal productModal" tabindex="-1">
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
              <label for="imageUrl">商品圖片<span v-text="prompt.imageUrl"></span></label>
              <input type="text" id="imageUrl" name="imageUrl" placeholder="請輸入圖片網址" v-model="tempData.imageUrl">
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
      editId: ""
    }
  },
  components: {
    pagination,
    productModalArea
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
    showAddProduct(status, id, index) {
      this.modalStatus = status;
      if (status === "editData") {
        this.showStatus.addData = false;
        this.showStatus.editData = false;
        this.editId = id;
        this.tempData = { ...this.products[index] };
      } else {
        this.showStatus.editData = false;
        this.showStatus.addData = true;
      }
      myModal.show();
    },
    closeAddProduct() {
      this.clearArrayData("tempData");
      myModal.hide();
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
            this.closeAddProduct();
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
            this.closeAddProduct();
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
      axios.delete(`${this.url}api/${this.path}/admin/product/${id}`)
        .then((res) => {
          if (res.data.success) {
            alert("產品刪除成功！");
            this.init();
          } else {
            alert("產品刪除失敗！");
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