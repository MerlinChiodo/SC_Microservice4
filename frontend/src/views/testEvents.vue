 <template>
  <div>
    <h1> send about Us event</h1>
    <button @click="testAboutUs"> send predefined About Us event</button>
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