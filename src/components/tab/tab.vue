<template>
  <div class="tab">
    <cube-tab-bar
      :useTransition="false"
      :showSlider="true"
      v-model="selectedLabel"
      :data="tabs"
      ref="tabBar"
      class="border-bottom-1px"
    ></cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :loop="false"
        :auto-play="false"
        :show-dots="false"
        :initial-index="index"
        ref="slide"
        :options="slideOptions"
        @scroll="onScroll"
        @change="onChange"
      >
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
          <component :is="tab.component" :data="tab.data" ref="component"></component>
        </cube-slide-item>
        <!-- <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
    <a :href="item.url">
      <img :src="item.image">
    </a>
        </cube-slide-item>-->
      </cube-slide>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    tabs: {
      type: Array,
      default () {
        return []
      }
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      index: this.initialIndex,
      // index: 0,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    selectedLabel: {
      get () {
        return this.tabs[this.index].label
      },
      set (newVal) {
        this.index = this.tabs.findIndex((value) => {
          return value.label === newVal
        })
      }
    }
  },
  mounted () {
    // 解决切换才有数据 首次没有
    this.onChange(this.index)
  },
  methods: {
    onChange (current) {
      this.index = current
      // 解决切换才有数据 首次没有
      const component = this.$refs.component[current]
      component._getGoods && component._getGoods()
    },
    onScroll (pos) {
      console.log(pos.x)
      // const x = Math.abs(pos.x)
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth
      const slideWidth = this.$refs.slide.slide.scrollerWidth
      const transform = -pos.x / slideWidth * tabBarWidth
      this.$refs.tabBar.setSliderTransform(transform)
    }
  }
}

</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.tab {
  display: flex;
  flex-direction: column;
  height: 100%;

  >>> .cube-tab {
    padding: 10px 0;
  }
}

.slide-wrapper {
  flex: 1;
  overflow: hidden;
}
</style>
