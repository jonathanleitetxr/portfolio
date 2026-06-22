import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

@Component({
  selector: 'app-chat-widget',
  imports: [FormsModule],
  templateUrl: './chat-widget.html',
  styleUrl: './chat-widget.css'
})
export class ChatWidget {

  isOpen = signal<boolean>(false);
  messages = signal<Message[]>([]);
  currentQuestion = '';
  isLoading = signal<boolean>(false);

  constructor(private chatService: ChatService) {}

  toggleChat(): void {
    this.isOpen.set(!this.isOpen());
  }

  sendQuestion(): void {
    const question = this.currentQuestion.trim();
    if (!question) return;

    // Ajoute la question de l'utilisateur à l'historique affiché
    this.messages.set([...this.messages(), { role: 'user', text: question }]);
    this.currentQuestion = '';
    this.isLoading.set(true);

    this.chatService.askQuestion(question).subscribe({
      next: (response) => {
        this.messages.set([...this.messages(), { role: 'assistant', text: response.answer }]);
        this.isLoading.set(false);
      },
      error: () => {
        this.messages.set([...this.messages(), { role: 'assistant', text: 'Une erreur est survenue, merci de réessayer.' }]);
        this.isLoading.set(false);
      }
    });
  }
}