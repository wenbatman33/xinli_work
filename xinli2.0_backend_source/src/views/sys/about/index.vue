<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <Description @register="infoRegister" class="enter-y" />
    <Description @register="register" class="my-4 enter-y" />
    <Description @register="registerDev" class="enter-y" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, h, computed, ref, onMounted } from 'vue';

  import { Tag } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';
  import { GITHUB_URL, SITE_URL, DOC_URL } from '/@/settings/siteSetting';
  export default defineComponent({
    name: 'AboutPage',
    components: { Description, PageWrapper },
    setup() {
      const { pkg, lastBuildTime } = __APP_INFO__;
      const { dependencies, devDependencies, name, version } = pkg;
      const schema: DescItem[] = [];
      const devSchema: DescItem[] = [];

      const commitID = ref('--');

      const getGitHash = () => {
        const request = new XMLHttpRequest();
        const currentDomain = window.location.origin;
        request.open('GET', `${currentDomain}/bofrontversion.txt`, true);
        request.send(null);
        request.onreadystatechange = function () {
          if (request.readyState === 4 && request.status === 200) {
            commitID.value = request.responseText || '--';
          } else {
            commitID.value = '--';
          }
        };
        request.onerror = function () {
          commitID.value = '--';
        };
        return request.responseText;
      };

      const commonTagRender = (color: string) => (curVal) => h(Tag, { color }, () => curVal);
      const commonLinkRender = (text: string) => (href) => h('a', { href, target: '_blank' }, text);
      const commonsCommitID = () => (val) => h('span', val);

      const infoSchema: DescItem[] = [
        {
          label: '版本',
          field: 'version',
          render: commonTagRender('blue'),
        },
        {
          label: '最后编译时间',
          field: 'lastBuildTime',
          render: commonTagRender('blue'),
        },
        {
          label: '文档地址',
          field: 'doc',
          render: commonLinkRender('文档地址'),
        },
        {
          label: '预览地址',
          field: 'preview',
          render: commonLinkRender('预览地址'),
        },
        {
          label: 'Github',
          field: 'github',
          render: commonLinkRender('Github'),
        },
        {
          label: 'Commit ID',
          field: 'commitID',
          render: commonsCommitID(),
        },
      ];

      const infoData = computed(() => {
        return {
          version,
          lastBuildTime,
          doc: DOC_URL,
          preview: SITE_URL,
          github: GITHUB_URL,
          commitID: commitID.value,
        };
      });

      Object.keys(dependencies).forEach((key) => {
        schema.push({ field: key, label: key });
      });

      Object.keys(devDependencies).forEach((key) => {
        devSchema.push({ field: key, label: key });
      });

      const [register] = useDescription({
        title: '生产环境依赖',
        data: dependencies,
        schema: schema,
        column: 3,
      });

      const [registerDev] = useDescription({
        title: '开发环境依赖',
        data: devDependencies,
        schema: devSchema,
        column: 3,
      });

      const [infoRegister] = useDescription({
        title: '项目信息',
        data: infoData,
        schema: infoSchema,
        column: 2,
      });

      onMounted(() => {
        process.env.NODE_ENV === 'production' && getGitHash();
      });

      return { register, registerDev, infoRegister, name, GITHUB_URL, commitID, infoData };
    },
  });
</script>
