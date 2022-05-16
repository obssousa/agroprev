<template>
  <div class="text-center">
    <v-dialog v-model="show" fullscreen>
      <flow-form
        :standalone="false"
        :questions="questions"
        :language="language"
        @submit="savePlantation"
      />
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import FlowForm, {
  QuestionModel,
  QuestionType,
  ChoiceOption,
  LanguageModel,
} from "@ditdot-dev/vue-flow-form";
import PlantationTypes from "@/constants/irrigationType";

export default {
  components: {
    FlowForm,
  },
  data() {
    return {
      language: new LanguageModel({
        // Your language definitions here (optional).
        // You can leave out this prop if you want to use the default definitions.
      }),
    };
  },
  props: {
    value: Boolean,
  },
  computed: {
    ...mapGetters("cultures", ["getCultures"]),
    questions() {
      return [
        // QuestionModel array
        new QuestionModel({
          title: "Setor",
          type: QuestionType.Text,
          id: "setor",
          tagline: "Cadastro de Novo Plantio",
          subtitle: "Gleba ou talhão",
          required: true,
          jump: "choiceCulture",
        }),
        new QuestionModel({
          title: "Cultura",
          type: QuestionType.Dropdown,
          id: "choiceCulture",
          tagline: "Cadastro de Novo Plantio",
          subtitle: "Selecione uma cultura cadastrada:",
          multiple: false,
          required: true,
          jump: "copeArea",
          options: this.getCultures.map(
            (culture) =>
              new ChoiceOption({
                label: culture.name,
                value: culture.coefficient,
              })
          ),
        }),
        new QuestionModel({
          title: "Cultura",
          type: QuestionType.Number,
          id: "copeArea",
          tagline: "Cadastro de Novo Plantio",
          subtitle: "Área de Copa (m²)",
          required: true,
          jump: "betweenPlants",
        }),
        new QuestionModel({
          title: "Espaçamento",
          type: QuestionType.Number,
          id: "betweenPlants",
          tagline: "Cadastro de Novo Plantio",
          subtitle: "Entre Plantas (m)",
          required: true,
          jump: "betweenLines",
        }),
        new QuestionModel({
          title: "Espaçamento",
          type: QuestionType.Number,
          id: "betweenLines",
          tagline: "Cadastro de Novo Plantio",
          subtitle: "Entre Linhas (m)",
          required: true,
          jump: "emissors",
        }),
        new QuestionModel({
          title: "Irrigação",
          type: QuestionType.Number,
          id: "emissors",
          tagline: "Cadastro de Novo Plantio",
          subtitle: "Quantidade de emissores",
          required: true,
          jump: "flow",
        }),
        new QuestionModel({
          title: "Irrigação",
          type: QuestionType.Number,
          id: "flow",
          tagline: "Cadastro de Novo Plantio",
          subtitle: "Vazão de emissor (L/h)",
          required: true,
          jump: "irrigationType",
        }),
        new QuestionModel({
          title: "Cultura",
          type: QuestionType.Dropdown,
          id: "irrigationType",
          tagline: "Cadastro de Novo Plantio",
          subtitle: "Selecione um tipo de irrigação:",
          multiple: false,
          required: true,
          jump: "efficiency",
          options: PlantationTypes.map(
            (type) =>
              new ChoiceOption({
                label: type,
              })
          ),
        }),
        new QuestionModel({
          title: "Eficiência",
          type: QuestionType.Number,
          id: "efficiency",
          tagline: "Cadastro de Novo Plantio",
          subtitle: "Eficiência (%)",
          required: true,
        }),
      ];
    },
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    ...mapActions({
      createPlantation: "plantations/createPlantation",
    }),
    savePlantation(questionList) {
      let formData = {};

      questionList.forEach((question) => {
        formData[question.id] = question.answer;
      });

      console.log(formData);

      this.createPlantation(formData);
      this.$emit('close');
    },
  },
};
</script>
<style>
/* Import Vue Flow Form base CSS */
@import "~@ditdot-dev/vue-flow-form/dist/vue-flow-form.css";
/* Import one of the Vue Flow Form CSS themes (optional) */
/* @import "~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.css"; */
/* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-green.css'; */
@import "~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-purple.css";
</style>