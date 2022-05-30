 <template>
  <div>
    <h3> send about us event</h3>
    <button @click="testAboutUs"> send </button>
  </div>
</template>

<script>
import {
  testAboutUs
} from "../controllers/aboutUsController";
export default{
  name: "testEvents",
  methods: {
    testAboutUs
  },
};
</script>


 <style scoped></style>