<template lang="pug">
  .container-fluid
    el-form(:model="formData", ref="form", label-width="160px", :rules="rules", status-icon)
      el-form-item(label="游戏名称", prop="game_name")
        el-input(v-model="formData.game_name", placeholder="请输入游戏名称")
      el-form-item(label="游戏厂商", prop="game_group_id")
        el-select(v-model="formData.game_group_id")
          el-option(
            v-for="gameGroup in gameGroups",
            :key="gameGroup.id",
            :value="gameGroup.id",
            :label="`${gameGroup.gameManGroupName} - ${gameGroup.gameManGroupCompanyTag}`"
          )
      el-form-item(label="游戏原厂代号", prop="betting_code")
        el-input(v-model="formData.betting_code", placeholder="请输入游戏原厂代号")
      el-form-item(label="游戏代码", prop="game_code")
        el-input(v-model="formData.game_code", placeholder="请输入游戏代码")
      el-form-item(label="上传图示", prop="images")
        el-upload(
          :http-request="setFile",
          :on-remove="removeImages",
          ref="images",
          :file-list="imagesList",
          list-type="picture",
          action="",
          :limit=1,
          accept="image/jpeg,image/gif,image/png",
          :on-exceed="handleExceed"
        )
          el-button(slot="trigger", size="mini") 选取图片
          span.ml-3 档案限制 1 MB，尺寸 1110 X 1000
      el-form-item(label="热门度", prop="popular")
        el-input(v-model="formData.popular", type="number", min="0")
      el-form-item(label="标签", prop="game_tag")
        el-select(v-model="formData.game_tag", multiple)
          el-option(
            v-for="tag in gameTags",
            :key="tag.id",
            :value="tag.id",
            :label="tag.gameManTagName",
            :disabled="! tag.gameManTagStatus"
          )
      el-form-item(label="计算流水", prop="return_type")
        el-switch(
          v-model="formData.return_type",
          active-text="是",
          :active-value="1",
          inactive-text="否",
          :inactive-value="0",
          inactive-color="red"
        )
      el-form-item(label="H5游戏", prop="h5_game")
        el-switch(
          v-model="formData.h5_game",
          active-text="是",
          :active-value="1",
          inactive-text="否",
          :inactive-value="0",
          inactive-color="red"
        )
      el-form-item(label="提供试玩", prop="game_play")
        el-switch(
          v-model="formData.game_play",
          active-text="有",
          :active-value="1",
          inactive-text="无",
          :inactive-value="0",
          inactive-color="red"
        )
      el-form-item(label="游戏营运", prop="game_device")
        el-select(v-model="formData.game_device")
          el-option(:value="0", label="全部")
          el-option(:value="1", label="WEB")
          el-option(:value="2", label="手机")
      el-form-item(label="状态", prop="status")
        el-switch(
          v-model="formData.status",
          active-text="启用",
          :active-value="1",
          inactive-text="停用",
          :inactive-value="0",
          inactive-color="red"
        )
      el-form-item(label="是否推荐", prop="recommend")
        el-switch(
          v-model="formData.recommend",
          active-text="启用",
          :active-value="1",
          inactive-text="停用",
          :inactive-value="0",
          inactive-color="red"
        )
      el-form-item
        el-button(@click="handleSubmit()") 储存
</template>

<script>
import { getGameAPI, getGameTagsAPI, editGameAPI, addGameAPI } from '@/api/site/game';
import { getGameGroupsAPI } from '@/api/site/gameGroup';

export default {
  data() {
    return {
      id: 0,
      gameTags: [],
      gameGroups: [],
      formData: {
        game_group_id: '',
        game_name: '',
        betting_code: '',
        game_code: '',
        game_device: 0,
        status: 0,
        popular: 0,
        game_tag: [],
        game_play: 0,
        return_type: 0,
        h5_game: 0,
        recommend: 0,
        images: '',
      },
      imagesList: [],
      rules: {
        game_group_id: [
          { required: true, message: '必须选择游戏厂商' }
        ],
        betting_code: [
          { required: true, message: '游戏原厂代号为必填' }
        ],
        game_name: [
          { required: true, message: '游戏名称为必填' }
        ],
        game_code: [
          { required: true, message: '游戏代码为必填' }
        ],
        game_device: [
          { required: true, message: '必须选择游戏营运平台' }
        ]
      }
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    getGameTagsAPI().then(response => {
      this.gameTags = response.data.data;
    });

    getGameGroupsAPI().then(response => {
      this.gameGroups = response.data.data;
    });

    if (this.$route.query.id) {
      getGameAPI(this.$route.query.id).then(response => {
        this.initGame(response.data.data[0]);
      });
    }
  },
  methods: {
    initGame(game) {
      this.id = game.id;
      this.formData.game_group_id = game.gameManListGameGroup ? game.gameManListGameGroup.value : 0;
      this.formData.game_name = game.gameManListGameName;
      this.formData.betting_code = game.gameManListBettingCode;
      this.formData.game_code = game.gameManListGameCode;
      this.formData.game_device = game.gameManListGameDevice ? game.gameManListGameDevice.value : 0;
      this.formData.status = game.gameManListStatus ? game.gameManListStatus.value : 0;
      this.formData.popular = game.gameManListPopular;
      this.formData.game_tag = game.gameManListGameTag.map(tag => tag.value);
      this.formData.game_play = game.gameManListGamePlay ? game.gameManListGamePlay.value : 0;
      this.formData.return_type = game.gameManListReturnType ? game.gameManListReturnType.value : 0;
      this.formData.h5_game = game.gameManListH5Game ? game.gameManListH5Game.value : 0;
      this.formData.recommend = game.gameManListRecommend ? game.gameManListRecommend.value : 0;

      if (game.gameManListImages) {
        this.imagesList = [{ url: this.$options.filters.urlAddTimestamp(game.gameManListImages) }];
      }
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const isCreate = this.id === 0;
          let formData = new FormData();

          formData.append('game_group_id', this.formData.game_group_id);
          formData.append('game_name', this.formData.game_name);
          formData.append('betting_code', this.formData.betting_code);
          formData.append('game_code', this.formData.game_code);
          formData.append('game_device', this.formData.game_device);
          formData.append('status', this.formData.status);
          formData.append('popular', this.formData.popular);
          formData.append('game_tag', this.formData.game_tag.join());
          formData.append('game_play', this.formData.game_play);
          formData.append('return_type', this.formData.return_type);
          formData.append('h5_game', this.formData.h5_game);
          formData.append('recommend', this.formData.recommend);
          formData.append('images', this.formData.images);

          isCreate ? this.handleCreate(formData) : this.handleUpdate(formData);
        }
      })
    },
    handleCreate(formData) {
      addGameAPI(formData).then(() => {
        this.$message.success('游戏 - 新增成功！');
        this.$refs.images.clearFiles();
        this.$refs.form.resetFields();
      });
    },
    handleUpdate(formData) {
      editGameAPI(this.id, formData).then(() => {
        this.$message.success('游戏 - 修改成功！');
      });
    },
    setFile(option) {
      this.formData.images = option.file;
    },
    removeImages() {
      this.formData.images = '';
    },
    handleExceed() {
      this.$message.warning('请先删除当前档案');
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  display: block;
}
</style>
