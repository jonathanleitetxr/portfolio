import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface qui définit la structure d'une compétence
// Elle doit correspondre exactement aux champs de l'entité Skill côté Spring Boot
export interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
}

// @Injectable rend ce service disponible dans toute l'application
// providedIn: 'root' signifie qu'Angular crée une seule instance partagée (singleton)
@Injectable({
  providedIn: 'root'
})
export class SkillService {

  // URL de base de l'API backend Spring Boot
  // En production, cette URL devra être changée vers l'URL du serveur déployé
  private apiUrl = 'http://localhost:8080/api/skills';

  // Injection de HttpClient via le constructeur
  // Angular fournit automatiquement une instance de HttpClient ici
  constructor(private http: HttpClient) {}

  // Récupère toutes les compétences depuis l'API
  // Retourne un Observable<Skill[]> : un flux asynchrone de tableau de compétences
  // Le composant qui appelle cette méthode devra s'abonner (subscribe) pour recevoir la donnée
  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl);
  }
}