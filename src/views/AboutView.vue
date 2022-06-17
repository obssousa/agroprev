<template>
   <v-card
    class="mx-auto mb-4"
    max-width="344"
  >

    <v-card-title>
      Sobre
    </v-card-title>

    <v-card-subtitle>
      Informações de Desenvolvimento
    </v-card-subtitle>

    <v-img
      contain
      height="300px"
      src="@/assets/UFPA.png"
    ></v-img>

    <v-card-actions>
      <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :color="message.color"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ message.from }}</strong>
                </div>
                <div>{{ message.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    data: () => ({
      messages: [
        {
          from: 'UFPA',
          message: 'Universidade Federal do Pará',
          color: 'green',
        },
        {
          from: 'ITEC',
          message: 'Instituto de Tecnologia',
          time: '9:47am',
          color: 'deep-purple lighten-1',
        },
                {
          from: 'Bruno Santos de Sousa',
          message: `Aluno de Engenharia da Computação`,
          color: 'deep-purple lighten-1',
        },
      ],
    }),
  }
</script>