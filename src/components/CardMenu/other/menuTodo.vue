<template>
  <section class="menu-todo-wrapper">
    <div class="menu-todo-content">
      <div
        v-for="item in todoList"
        :key="item.menuId || item.code"
        class="menu-todo-item"
        @click="todoClick(item)"
      >
        <span class="content">{{ item.menuName }}</span>
        <span class="number">{{ item.todoCount }}条</span>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    // 当前的卡片
    card: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['todoInfo/getMenuTodoInfo']),
    todoList() {
      return this['todoInfo/getMenuTodoInfo'](this.card.currentCard)?.todoList || []
    }
  },
  methods: {
    /**
     * 点击待办跳转
     * @param menu { menuId: string, menuName: string, code: string, url: string, params5: string, todoCount: number  }
     */
    todoClick(menu) {
      const { menuId: id, menuName: name, params5, url, code } = menu
      const params = {
        id,
        name,
        params5,
        // code必填，但是值随便都起作用
        code: code || this.$XEUtils.uniqueId(),
        url: url?.startsWith('/') ? url : `/${url}`
      }
      this.$store.commit('setCurMenuObj', params)
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-todo-wrapper {
  font-size: 14px;
  padding: 16px 0;
  height: 120px;
  overflow-y: auto;
  box-sizing: border-box;

  .menu-todo-content {
    display: flex;
    flex-wrap: wrap;

    .menu-todo-item {
      display: flex;
      align-items: center;
      padding: 8px 24px;
      width: 25%;
      flex-shrink: 0;
      color: var(--primary-color);
      cursor: pointer;
      box-sizing: border-box;

      .content {
        max-width: 80%;
        text-decoration: underline;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .number {
        margin-left: 8px;
        color: #FFA522;
      }
      &:hover {
        color: var(--secondary-color-anamorphism);
      }
    }
  }
}
</style>
