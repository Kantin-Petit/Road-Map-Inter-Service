import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.css']
})
export class JsonEditorComponent implements OnInit {
  jsonForm!: FormGroup;
  jsonData: any; // Votre objet JSON

  constructor(private formBuilder: FormBuilder, 
    private http: HttpClient,
    private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadJSONData(); // Charger les données JSON depuis le serveur
  }

  private initForm(): void {
    this.jsonForm = this.formBuilder.group({
      photo: [''],
      description: [''],
      // Ajoutez d'autres champs pour chaque élément de "data"
      dataTitle: [''],
      dataText: ['']
    });
  }

  private loadJSONData(): void {
    this.serviceService.getAllService().subscribe(
      (data) => {
        this.jsonData = data;
        this.patchFormWithData();
      },
      (error) => {
        console.error('Erreur lors du chargement du fichier JSON : ', error);
      }
    );
  }

  private patchFormWithData(): void {
    this.jsonForm.patchValue({
      photo: this.jsonData.informatique.photo,
      description: this.jsonData.informatique.description,
      dataTitle: this.jsonData.informatique.data[0].titre,
      dataText: this.jsonData.informatique.data[0].texte
    });
  }

  onSubmit(): void {
    // Récupérer les valeurs modifiées depuis le formulaire
    const photoValue = this.jsonForm.value.photo;
    const descriptionValue = this.jsonForm.value.description;
    const dataTitleValue = this.jsonForm.value.dataTitle;
    const dataTextValue = this.jsonForm.value.dataText;

    // Mettre à jour l'objet JSON avec les nouvelles valeurs
    this.jsonData.informatique.photo = photoValue;
    this.jsonData.informatique.description = descriptionValue;
    this.jsonData.informatique.data[0].titre = dataTitleValue;
    this.jsonData.informatique.data[0].texte = dataTextValue;

    // Envoyer les modifications au serveur
    this.http.put('chemin/vers/votre-fichier.json', this.jsonData).subscribe(
      (response) => {
        console.log('Fichier JSON modifié avec succès : ', response);
      },
      (error) => {
        console.error('Erreur lors de la modification du fichier JSON : ', error);
      }
    );
  }
}
