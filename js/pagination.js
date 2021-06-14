export default {
  props: ["page"],
  methods: {
    changePage(page) {
      console.log("changePage", typeof page);
      this.$emit("emit-init", page);
    }
  },
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{disabled:!page.has_pre}">
      <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(page.current_page-1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" :class="{active:page.current_page===item}" v-for="item in page.total_pages" :key="item"><a class="page-link" href="#" @click.prevent="changePage(item)">{{item}}</a></li>
    <li class="page-item" :class="{disabled:!page.has_next}">
      <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(page.current_page+1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`
}