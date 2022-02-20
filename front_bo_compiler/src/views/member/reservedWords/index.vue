<template lang="pug">
  .container-fluid
    .w-50.mb-2
      el-input(
        v-model.trim="reservedWord",
        ref="reservedWordInput",
        @keyup.enter.native="addReservedWord()",
        @keyup.esc.native="initInput()"
        @input="searchWord()",
        placeholder="请输入保留字(限填 16 字内小写英文、数字、底线)",
      )
        el-button(slot="append", @click="addReservedWord()", :disabled="addDisabled") +
    //- 搜寻结果
    .d-flex.flex-wrap(v-if="fuseResult.length")
      el-tag.m-2(
        v-for="word in fuseResult",
        :key="word.id",
        type="danger",
        :disable-transitions="true"
      ) {{ word.reservedWord }}
    //- 列表
    .d-flex.align-items-center.flex-wrap(v-else-if="words.length")
      template(v-for="word in words")
        input(
          v-if="word.edit",
          ref="editInput",
          v-model="editWord",
          style="height: 28px",
          @blur="cancelEdit(word)",
          @keyup.enter="handleEdit(word)",
          @keyup.esc="cancelEdit(word)",
        )
        el-tag.m-2(
          v-else,
          closable,
          @close="removeReservedWord(word)",
          @dblclick.native="editReservedWord(word)",
          :disable-transitions="true",
        ) {{ word.reservedWord }}
    //- 无任何保留字
    el-alert(v-else, type="warning") 无保留字
</template>

<script>
import Fuse from 'fuse.js'
import {
  getReservedWordsAPI,
  addReservedWordAPI,
  deleteReservedWordAPI,
  editReservedWordAPI
} from '@/api/member/reservedWords.js';

export default {
  data() {
    return {
      addDisabled: false,
      reservedWord: '',
      words: [],
      editWord: '',
      fuse: undefined,
      fuseResult: [],
    }
  },
  mounted() {
    this.initInput();
    this.getReservedWords();
  },
  methods: {
    getReservedWords() {
      getReservedWordsAPI().then(response => {
        this.words = response.data.data;
        this.initFuse(this.words);
      });
    },

    initInput() {
      this.reservedWord = '';
      this.$refs.reservedWordInput.focus();
      this.fuseResult = [];
    },

    initFuse(list) {
      this.fuse = new Fuse(list, {
        keys: ['reservedWord']
      });
    },

    searchWord() {
      if (this.reservedWord !== '') {
        this.fuseResult = this.fuse.search(this.reservedWord);

      } else {
        this.fuseResult = []
      }
    },

    addReservedWord() {
      if (! this.addDisabled && this.reservedWord) {
        this.addDisabled = true;

        addReservedWordAPI({ word: this.reservedWord })
        .then(() => {
          this.$message.success('新增保留字成功');
          this.getReservedWords();
          this.initInput();
        })
        .finally(() => {
          this.addDisabled = false;
        });
      }
    },

    removeReservedWord({ id, reservedWord }) {
      deleteReservedWordAPI(id).then(() => {
        this.$message.success(`保留字 【${reservedWord}】 删除成功`);
        this.getReservedWords();
        this.initInput();
      })
    },

    editReservedWord(word) {
      this.$set(word, 'edit', true);
      this.editWord = word.reservedWord;
      this.$nextTick(() => {
        this.$refs.editInput[0].focus();
      });
    },

    cancelEdit(word) {
      word.edit = false;
    },

    handleEdit(word) {
      if (word.reservedWord === this.editWord) {
        return void(word.edit = false);
      }

      editReservedWordAPI(word.id, { word: this.editWord })
      .then(() => {
        this.$message.success('保留字修改成功');
        word.reservedWord = this.editWord;
        word.edit = false;
      });
    },
  }
}
</script>
