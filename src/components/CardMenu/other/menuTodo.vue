<template>
  <section class="menu-todo-wrapper">
    <p v-if="!todoList || !todoList.length" class="todo-empty-text">暂无待办数据</p>
    <div v-else class="menu-todo-content">
      <div
        v-for="item in todoList"
        :key="item.menuId || item.code"
        class="menu-todo-item"
        @click="todoClick(item)"
      >
        <el-tooltip :content="`${item.menuName}${item.menuTabName || ''}`">
          <div class="menu-todo-item-wrapper">
            <span class="content">
              {{ item.menuName }}
              <span v-if="item.menuTabName || item.menuTabCode" class="status">（{{ item.menuTabName }}）</span>
            </span>
            <span class="number">{{ item.todoCount }}条</span>
          </div>
        </el-tooltip>
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
     * @param menu { menuId: string, menuName: string, code: string, url: string, param5: string, todoCount: number  }
     */
    todoClick(menu) {
      let { menuId: id, menuName: name, param5, url, code, menuTabCode } = menu
      const currentMenu = this.$XEUtils.toTreeArray(this.$store.state.systemMenu || [])
        .find(item => item.guid === id)
      if (menuTabCode) {
        param5 = `${param5 || ''},menuTabCode=${menuTabCode}`
      }
      const curMenuObj = {
        ...currentMenu,
        id,
        name,
        param5,
        // code必填，但是值随便都起作用
        code: code || this.$XEUtils.uniqueId(),
        url
      }
      this.$store.commit('setCurMenuObj', curMenuObj)
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

  .todo-empty-text {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 20px;
    color: #dFE1E2;
  }

  .menu-todo-content {
    display: flex;
    flex-wrap: wrap;

    .menu-todo-item {
      flex-shrink: 0;
      width: 25%;
      color: var(--primary-color);
      cursor: pointer;

      .menu-todo-item-wrapper {
        display: flex;
        align-items: center;
        padding: 8px 24px;
        box-sizing: border-box;
        flex-shrink: 0;
      }

      .content {
        max-width: 70%;
        text-decoration: underline;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .status {
        margin-left: 2px;
      }
      .number {
        margin-left: 16px;
        color: #FFA522;
        flex-shrink: 0;
      }
      &:hover {
        color: var(--secondary-color-anamorphism);
      }
    }
  }
}
</style>
