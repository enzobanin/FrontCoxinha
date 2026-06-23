import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// 1. Interface de Estrutura de Dados
interface Usuario {
  name: string;
  email: string;
  password: string;
  cpf: string;
  telefone: string;
  dataNascimento: Date; // Armazenado como string ISO, mas tipado como Date para clareza
}

@Component({
  selector: 'app-auth',
  // Importações necessárias para usar (WIP) e Reactive Forms no componente Standalone
  standalone: true, // Adicionando standalone para consistência
  imports: [FormsModule, ReactiveFormsModule, CommonModule], 
  templateUrl: './auth.html', // Assumindo o HTML que criamos
  styleUrl: './auth.css',
})
export class Auth implements OnInit {
  
  // 2. Propriedades da Classe
  form!: FormGroup; // ! indica que será inicializado no ngOnInit
  isLoginMode = true; // Inicia no modo Login por padrão

  // 3. Injeção de Dependências
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  // 4. Ciclo de Vida: Inicializa o formulário
  ngOnInit(): void {
    this.setupForm();
  }

  // 5. Setup do Formulário Reativo
  setupForm(): void {
    this.form = this.fb.group({
      // Campos de Cadastro (Opcionais no Login, mas inicializados)
      name: [''],
      cpf: [''],
      telefone: [''],
      dataNascimento: [''],
      
      // Campos Comuns (Requeridos em ambos)
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
    // Adiciona/Remove validadores conforme o modo
    this.setValidators(); 
  }

  // 6. Define Validadores Condicionais
  setValidators(): void {
    if (!this.isLoginMode) {
      // Modo Cadastro: Define TODOS como requeridos
      this.form.controls['name'].setValidators(Validators.required);
      this.form.controls['cpf'].setValidators([Validators.required, Validators.minLength(11)]); 
      this.form.controls['telefone'].setValidators(Validators.required);
      this.form.controls['dataNascimento'].setValidators(Validators.required);
    } else {
      // Modo Login: Remove validadores extras
      this.form.controls['name'].clearValidators();
      this.form.controls['cpf'].clearValidators();
      this.form.controls['telefone'].clearValidators();
      this.form.controls['dataNascimento'].clearValidators();
    }
    
    // Revalida o formulário
    this.form.controls['name'].updateValueAndValidity();
    this.form.controls['cpf'].updateValueAndValidity();
    this.form.controls['telefone'].updateValueAndValidity();
    this.form.controls['dataNascimento'].updateValueAndValidity();
  }

  // 7. Alterna entre Login e Cadastro
  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.form.reset(); // Limpa o formulário ao alternar
    this.setValidators(); // Atualiza os validadores
  }

  // 8. Funções de localStorage (Salvar/Buscar Usuários)
  getUsuarios(): Usuario[] {
    const dados = localStorage.getItem('usuarios');
    return dados ? JSON.parse(dados) : [];
  } 

  salvarUsuarios(lista: Usuario[]): void {
    localStorage.setItem('usuarios', JSON.stringify(lista));
  }

  // 9. Lógica de Submissão do Formulário
  onSubmit(): void {
    
    // Se o form estiver inválido, interrompe. (Aplica-se ao modo atual)
    if (this.form.invalid) {
      console.log('Formulário Inválido! Erros:', this.form.errors);
      // Opcional: Marcar todos os campos como "touched" para exibir mensagens de erro
      this.form.markAllAsTouched(); 
      return;
    }

    const { name, email, password, cpf, telefone, dataNascimento } = this.form.value;
    const usuarios = this.getUsuarios();

    if (this.isLoginMode) {
      // LÓGICA DE LOGIN
      const usuario = usuarios.find(u => u.email === email && u.password === password);
      
      if (usuario) {
        console.log('Login bem-sucedido!', usuario);
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        this.router.navigate(['/home']); // Navega para a Home
      } else {
        alert('Email ou senha inválidos!');
      }

    } else {
      // LÓGICA DE CADASTRO
      const usuarioJaExiste = usuarios.some(u => u.email === email);

      if (usuarioJaExiste) {
        alert('Este email já está cadastrado!');
        return;
      }

      // Cria novo usuário e salva
      const novoUsuario: Usuario = { name, email, password, cpf, telefone, dataNascimento };
      usuarios.push(novoUsuario);
      this.salvarUsuarios(usuarios);
      
      alert('Cadastro criado com sucesso! Faça o login.');
      this.toggleMode(); // Volta para o modo Login
    }
  }
}