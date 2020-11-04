<template>
  <div
    class="drag"
    :style="'top:'+top+'px;left:'+left+'px;width:'+width+'px;height:'+height+'px;z-index:'+zIndex+';'"
    :class="`${(active || isActive) ? 'active' : 'inactive'} ${contentClass ? contentClass: ''}`"
    @mousedown="bodyDown($event)"
    @touchstart="bodyDown($event)"
    @touchend="up($event)"
  >
    <slot />
  </div>
</template>

<script>

export default {
  name: 'Drag',
  props: {
    isActive: {
      type: Boolean, default: false
    },
    preventActiveBehavior: {
      type: Boolean, default: false
    },
    isDraggable: {
      type: Boolean, default: true
    },
    parentLimitation: {
      type: Boolean, default: false
    },
    parentW: {
      type: Number,
      default: 0,
      validator: function(val) {
        return val >= 0
      }
    },
    parentH: {
      type: Number,
      default: 0,
      validator: function(val) {
        return val >= 0
      }
    },
    w: {
      type: Number,
      default: 100,
      validator: function(val) {
        return val > 0
      }
    },
    h: {
      type: Number,
      default: 100,
      validator: function(val) {
        return val > 0
      }
    },
    x: {
      type: Number,
      default: 0,
      validator: function(val) {
        return typeof val === 'number'
      }
    },
    y: {
      type: Number,
      default: 0,
      validator: function(val) {
        return typeof val === 'number'
      }
    },
    z: {
      type: [String, Number],
      default: 'auto',
      validator: function(val) {
        const valid = (typeof val === 'string') ? val === 'auto' : val >= 0
        return valid
      }
    },
    dragHandle: {
      type: String,
      default: null
    },
    dragCancel: {
      type: String,
      default: null
    },
    contentClass: {
      type: String,
      required: false,
      default: ''
    }
  },

  data: function() {
    return {
      active: this.isActive,
      rawWidth: this.w,
      rawHeight: this.h,
      rawLeft: this.x,
      rawTop: this.y,
      rawRight: null,
      rawBottom: null,
      zIndex: this.z,
      parentWidth: null,
      parentHeight: null,
      left: this.x,
      top: this.y,
      right: null,
      bottom: null
    }
  },

  computed: {
    width() {
      return this.parentWidth - this.left - this.right
    },
    height() {
      return this.parentHeight - this.top - this.bottom
    },
    rect() {
      return {
        left: Math.round(this.left),
        top: Math.round(this.top),
        width: Math.round(this.width),
        height: Math.round(this.height)
      }
    }
  },
  watch: {
    rawLeft(newLeft) {
      const limits = this.limits

      if (limits.minLeft !== null && newLeft < limits.minLeft) {
        newLeft = limits.minLeft
      } else if (limits.maxLeft !== null && limits.maxLeft < newLeft) {
        newLeft = limits.maxLeft
      }

      this.left = newLeft
    },

    rawRight(newRight) {
      const limits = this.limits

      if (limits.minRight !== null && newRight < limits.minRight) {
        newRight = limits.minRight
      } else if (limits.maxRight !== null && limits.maxRight < newRight) {
        newRight = limits.maxRight
      }

      this.right = newRight
    },

    rawTop(newTop) {
      const limits = this.limits

      if (limits.minTop !== null && newTop < limits.minTop) {
        newTop = limits.minTop
      } else if (limits.maxTop !== null && limits.maxTop < newTop) {
        newTop = limits.maxTop
      }

      this.top = newTop
    },

    rawBottom(newBottom) {
      const limits = this.limits

      if (limits.minBottom !== null && newBottom < limits.minBottom) {
        newBottom = limits.minBottom
      } else if (limits.maxBottom !== null && limits.maxBottom < newBottom) {
        newBottom = limits.maxBottom
      }

      this.bottom = newBottom
    },
    active(isActive) {
      if (isActive) {
        this.$emit('activated')
      } else {
        this.$emit('deactivated')
      }
    },

    isActive(val) {
      this.active = val
    },

    z(val) {
      if (val >= 0 || val === 'auto') {
        this.zIndex = val
      }
    },
    x() {
      if (this.bodyDrag) {
        return
      }
      if (this.parentLimitation) {
        this.limits = this.calcDragLimitation()
      }

      const delta = this.x - this.left
      this.rawLeft = this.x
      this.rawRight = this.right - delta
    },

    y() {
      if (this.bodyDrag) {
        return
      }

      if (this.parentLimitation) {
        this.limits = this.calcDragLimitation()
      }

      const delta = this.y - this.top
      this.rawTop = this.y
      this.rawBottom = this.bottom - delta
    },
    parentW(val) {
      this.right = val - this.width - this.left
      this.parentWidth = val
    },

    parentH(val) {
      this.bottom = val - this.height - this.top
      this.parentHeight = val
    }
  },

  created: function() {
    this.bodyDrag = false
    this.stickStartPos = { mouseX: 0, mouseY: 0, top: 0, bottom: 0, left: 0, right: 0 }
    this.limits = {
      minLeft: null,
      maxLeft: null,
      minRight: null,
      maxRight: null,
      minTop: null,
      maxTop: null,
      minBottom: null,
      maxBottom: null
    }
  },

  mounted: function() {
    this.parentElement = this.$el.parentNode
    this.parentWidth = this.parentW ? this.parentW : this.parentElement.clientWidth
    this.parentHeight = this.parentH ? this.parentH : this.parentElement.clientHeight

    this.rawRight = this.parentWidth - this.rawWidth - this.rawLeft
    this.rawBottom = this.parentHeight - this.rawHeight - this.rawTop

    document.documentElement.addEventListener('mousemove', this.move)
    document.documentElement.addEventListener('mouseup', this.up)
    document.documentElement.addEventListener('mouseleave', this.up)

    document.documentElement.addEventListener('mousedown', this.deselect)

    document.documentElement.addEventListener('touchmove', this.move, true)
    document.documentElement.addEventListener('touchend', this.up, true)
    document.documentElement.addEventListener('touchcancel', this.up, true)
    // document.documentElement.addEventListener('touchstart', this.up, true)

    if (this.dragHandle) {
      const dragHandles = Array.prototype.slice.call(this.$el.querySelectorAll(this.dragHandle))
      for (const i in dragHandles) {
        dragHandles[i].setAttribute('data-drag-handle', this._uid)
      }
    }

    if (this.dragCancel) {
      const cancelHandles = Array.prototype.slice.call(this.$el.querySelectorAll(this.dragCancel))
      for (const i in cancelHandles) {
        cancelHandles[i].setAttribute('data-drag-cancel', this._uid)
      }
    }
  },

  beforeDestroy: function() {
    document.documentElement.removeEventListener('mousemove', this.move)
    document.documentElement.removeEventListener('mouseup', this.up)
    document.documentElement.removeEventListener('mouseleave', this.up)

    document.documentElement.removeEventListener('mousedown', this.deselect)

    document.documentElement.removeEventListener('touchmove', this.move, true)
    document.documentElement.removeEventListener('touchend', this.up, true)
    document.documentElement.removeEventListener('touchcancel', this.up, true)
    // document.documentElement.removeEventListener('touchstart', this.up, true)
  },

  methods: {
    deselect() {
      if (this.preventActiveBehavior) {
        return
      }
      this.active = false
    },

    move(ev) {
      if (!this.bodyDrag) {
        return
      }

      ev.stopPropagation()
      this.bodyMove(ev)
    },

    up(ev) {
      if (this.bodyDrag) {
        this.bodyUp(ev)
      }
    },

    bodyDown: function(ev) {
      const target = ev.target || ev.srcElement

      if (!this.preventActiveBehavior) {
        this.active = true
      }

      if (ev.button && ev.button !== 0) {
        return
      }

      if (!this.active) {
        return
      }
      if (this.dragHandle && target.getAttribute('data-drag-handle') !== this._uid.toString()) {
        return
      }

      if (this.dragCancel && target.getAttribute('data-drag-cancel') === this._uid.toString()) {
        return
      }

      this.$emit('clicked', ev)

      ev.stopPropagation()
      ev.preventDefault()

      if (this.isDraggable) {
        this.bodyDrag = true
      }

      this.stickStartPos.mouseX = typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX
      this.stickStartPos.mouseY = typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY

      this.stickStartPos.left = this.left
      this.stickStartPos.right = this.right
      this.stickStartPos.top = this.top
      this.stickStartPos.bottom = this.bottom

      if (this.parentLimitation) {
        this.limits = this.calcDragLimitation()
      }
    },

    calcDragLimitation() {
      const parentWidth = this.parentWidth
      const parentHeight = this.parentHeight

      return {
        minLeft: 0,
        maxLeft: parentWidth - this.width,
        minRight: 0,
        maxRight: parentWidth - this.width,
        minTop: 0,
        maxTop: parentHeight - this.height,
        minBottom: 0,
        maxBottom: parentHeight - this.height
      }
    },

    bodyMove(ev) {
      const stickStartPos = this.stickStartPos
      const pageX = typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX
      const pageY = typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY

      const offsetX = stickStartPos.mouseX - pageX
      const offsetY = stickStartPos.mouseY - pageY

      this.rawTop = stickStartPos.top - offsetY
      this.rawBottom = stickStartPos.bottom + offsetY
      this.rawLeft = stickStartPos.left - offsetX
      this.rawRight = stickStartPos.right + offsetX
      this.$emit('dragging', this.rect)
    },
    bodyUp() {
      this.bodyDrag = false
      this.$emit('dragging', this.rect)
      this.$emit('dragstop', this.rect)

      this.stickStartPos = { mouseX: 0, mouseY: 0, top: 0, bottom: 0, left: 0, right: 0 }
      this.limits = {
        minLeft: null,
        maxLeft: null,
        minRight: null,
        maxRight: null,
        minTop: null,
        maxTop: null,
        minBottom: null,
        maxBottom: null
      }
    },
    calcResizeLimitation() {
      const width = this.width
      const height = this.height
      const bottom = this.bottom
      const top = this.top
      const left = this.left
      const right = this.right

      const parentLim = this.parentLimitation ? 0 : null

      const limits = {
        minLeft: parentLim,
        maxLeft: left + (width),
        minRight: parentLim,
        maxRight: right + (width),
        minTop: parentLim,
        maxTop: top + (height),
        minBottom: parentLim,
        maxBottom: bottom + (height)
      }

      return limits
    }
  }
}
</script>

<style scoped>
  .drag {
    position: absolute;
    box-sizing: border-box;
  }
</style>
