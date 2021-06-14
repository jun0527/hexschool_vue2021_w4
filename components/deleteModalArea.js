export default {
  data() {
    return {
      deleteModal: {}
    }
  },
  props: ["deleteId", "productTitle"],
  methods: {
    openModal() {
      this.deleteModal.show();
    },
    closeModal() {
      this.$emit("close-modal", 'deleteModal');
      this.deleteModal.hide();
    },
    deleteData(id) {
      this.$emit("delete-data", id)
    }
  },
  mounted() {
    this.deleteModal = new bootstrap.Modal(this.$refs.modal, { backdrop: 'static', keyboard: false });
  },
  template: `<div ref="modal" class="modal fade deleteModal" id="exampleModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">刪除確認</h5>
        <button type="button" class="btn-close btn-close-white" @click="closeModal('deleteModal')"></button>
      </div>
      <div class="modal-body">
        <p class="my-2">確定要刪除{{productTitle}}？</p>
        <p class="my-2">商品刪除後將無法復原！</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal('deleteModal')">取消</button>
        <button type="button" class="btn btn-danger" @click="deleteData(deleteId)">刪除</button>
      </div>
    </div>
  </div>
</div>`
}