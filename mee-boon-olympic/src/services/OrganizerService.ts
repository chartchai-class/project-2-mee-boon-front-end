import axios from "axios";
import type { Organizer } from "@/types";
import apiClient from "./AxiosCilent";

export default {
    getOrgaizers() {
        return apiClient.get('/organizers')
    },
    saveOrganizer(organizer: Organizer) {
      return apiClient.post('/organizer', organizer)
    }
}