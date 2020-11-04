<template>
  <div>
    <div class="d-block d-md-none mb-10">
      <ul class="pagination_area d-flex list-unstyled mb-0 justify-content-end">
        <li>
          <ul class="pagination d-flex justify-content-lg-end justify-content-between align-items-center mb-0">
            <li class="page-item disabled">
              <a class="page-link text-center rounded-0" href="#" tabindex="-1" aria-disabled="true"><i class="icon-arrow_back_ios" /></a>
            </li>
            <li>
              1/10
            </li>
            <li class="page-item">
              <a class="page-link text-center rounded-0" href="#"><i class="icon-arrow_forward_ios" /></a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div v-if="!deskHide" class="d-none d-md-block mb-10">
      <ul class="pagination_area d-flex list-unstyled mb-0 justify-content-end">
        <li>
          <ul class="pagination d-flex list-unstyled mb-0 justify-content-end">
            <li class="page-item disabled">
              <a class="page-link text-center rounded-0" href="#" tabindex="-1" aria-disabled="true"><i class="icon-arrow_back_ios" /></a>
            </li>
            <li class="page-item">
              <a class="page-link active text-center" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link text-center" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link text-center" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link text-center rounded-0" href="#"><i class="icon-arrow_forward_ios" /></a>
            </li>
            <li class="redirect_to">
              <span class="float-left">跳轉到</span><input class="form-control text-center rounded-0" type="text" placeholder="页数">
            </li>
            <li>
              <a class="btn btn_primary rounded-0 w-100" href="#">GO</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      default: 1,
      type: Number
    },
    totalPage: {
      default: 1,
      type: Number
    },
    range: {
      default: 2,
      type: Number
    },
    deskHide: {
      defalt: false,
      type: Boolean
    }
  }
}
</script>
