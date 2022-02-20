<template lang="pug">
  .container-fluid#group-permission
    el-tree(
      :data="permissionTree",
      node-key='id',
      show-checkbox,
      ref="permissionTree",
      accordion
    )
    el-button.ml-4(type="success", size="mini", @click="submitPermission") 送出
</template>

<script>
import { getPermissionListAPI, getPermissionByGroupAPI, updatePermissionByGroupAPI } from '@/api/acl/permission';

export default {
  data() {
    return {
      permissions: [],
      permissionTree: []
    }
  },
  created() {
    getPermissionListAPI()
    .then(response => {
      let result = [];
      let makeMenuChildren = menu => {
        let children = [];

        menu.subNode.map(subNode => {
          children.push({ label: subNode.funcName, id: subNode.id })
          if (subNode.subNode.length) {
            children = children.concat(makeMenuChildren(subNode));
          }
        })

        return children;
      }

      let makePermissionItems = menu => {
        let result = [];
        result = menu.subNode.filter(subNode => Object.keys(subNode.parameterInfo.button).length);
        menu.subNode.map(subNode => {
          if (subNode.subNode.length) {
            result = result.concat(makePermissionItems(subNode));
          }
        });
        return result;
      }

      this.permissions = response.data.data;
      this.permissions.forEach(item => {
        let children = [];
        let hasPermissionItems = [];

        children.push({
          label: '功能项目',
          children: makeMenuChildren(item)
        })

        hasPermissionItems = makePermissionItems(item)
        if (hasPermissionItems.length > 0) {
          hasPermissionItems.map(hasPermissionItem => {
            children.push({
              label: `【权限】 ${hasPermissionItem.funcName}`,
              children: [
                ...Object.keys(hasPermissionItem.parameterInfo.button).map(key => ({
                  id: key,
                  label: hasPermissionItem.parameterInfo.button[key]
                }))
              ]
            })
          })
        }

        result.push({ label: item.funcName, children})
      });

      this.permissionTree = result;

      return getPermissionByGroupAPI(this.$route.query.id);
    })
    .then(response => {
      let checked = [];
      checked.push(...response.data.data.filter(item => item.read_auth === 1).map(item => item.admin_function_id));
      response.data.data.map(item => {
        if (item.hide_info) {
            Object.keys(item.hide_info.button).map(key => {
            if (item.hide_info.button[key] === 1) {
              checked.push(key);
            }
          })
        }
      });

      this.$refs.permissionTree.setCheckedKeys(checked);
    });
  },
  methods: {
    submitPermission() {
      let treeData = this.$refs.permissionTree.getCheckedNodes();
      let func_hide_info = [];
      let makeFuncHideInfo = item => {
        item.subNode.forEach(subItem => {
          let button = {};
          // let block = {};

          Object.keys(subItem.parameterInfo.button).map(key => {
            button[key] = treeData.some(tree => tree.id === key) ? 1 : 0;
          });

          func_hide_info.push({
            admin_function_id: subItem.id,
            read_auth: treeData.some(tree => tree.id === subItem.id) ? 1 : 0,
            hide_info: {
              button
            }
          })

          if (subItem.subNode.length) {
            makeFuncHideInfo(subItem);
          }
        })
      }

      this.permissions.forEach(item => {
        func_hide_info.push({
          admin_function_id: item.id,
          read_auth: 1,
          hide_info: {
            button: {},
            block: {}
          }
        })

        makeFuncHideInfo(item)
      })

      updatePermissionByGroupAPI(this.$route.query.id, {func_hide_info}).then(() => {
        this.$message.success('更新成功');
        this.$store.dispatch('menu/getAllPageApi');
      })
    }
  }
}
</script>

<style lang="scss">
#group-permission {
  .el-tree-node__content {
    display: block;
    & > .el-tree-node__label {
      margin-left: 8px;
    }
  }
}
</style>
