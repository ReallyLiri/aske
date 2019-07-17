import FireBase from "../infra/firebase";

const RESPONSES_COLLECTION = "responses";

export default class ResponsesService {

  static async update(username, questions) {
    const mappedResponses = questions && questions.length ? questions.map(
      q => {
        return {id: q.id, response: q.response || null}
      }
    ) : null;
    await FireBase.set(RESPONSES_COLLECTION, username, {responses: mappedResponses});
  }

  static async get(username) {
    const result = await FireBase.get(RESPONSES_COLLECTION, username);
    return {
      responses: result ? result.responses : []
    }
  }

}
