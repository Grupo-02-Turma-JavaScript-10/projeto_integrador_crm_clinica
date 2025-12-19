<h1 align="center">CRMed - API para Gerenciamento de Consultas Médicas</h1>
<h3 align="center">Sistema de Agendamento e Controle de Consultas Clínicas</h3>

<h4 align="center">Por Alan Dias, Eduardo Reis, Enrique Andreazza, Kali França, Karoline S. Fassel, Lívia Dias e Pâmela dos Reis</h4>

<div align="center">
  <img src="https://i.imgur.com/znEnnyf.png" alt="Descrição da Imagem" width="400">
</div>

---

# 📌 Descrição Geral
O **CRMed** é uma API de gerenciamento de consultas médicas voltada para clínicas e profissionais da saúde. A aplicação permite o Registro de Pacientes, Cadastro de Especialidades Médicas e Agendamento de Consultas, possibilitando consultar, editar e gerenciar o status de realização das consultas - Tanto sobre os Pacientes quanto sobre as Especialidades e Consultas agendadas - sempre que necessário.

---

# 🧩 Entidades e Atributos
## 👤 Entidade **Paciente** 
A entidade principal do sistema é o **Paciente** cadastrado na clínica. Os atributos definidos além do ID são:

- **nome** – Nome completo do paciente  
- **usuario** – E-mail do paciente utilizado para login  
- **senha** – Senha criptografada para acesso ao sistema  
- **foto** – URL ou base64 da foto de perfil do paciente  
- **consulta** – Lista de consultas agendadas pelo paciente

Esses atributos foram escolhidos por representarem informações essenciais para sistemas de gerenciamento clínico, garantindo identificação única e segurança no acesso.

---

## 🩺 Entidade **Especialidade**
A entidade **Especialidade** representa as áreas médicas disponíveis na clínica. Os atributos definidos além do ID são:

- **nome** – Nome da especialidade médica (Ex: Cardiologia, Dermatologia)  
- **descricao** – Descrição detalhada da especialidade e seus tratamentos  
- **consulta** – Lista de consultas associadas a esta especialidade

Esses atributos foram escolhidos por permitirem organização clara das áreas médicas oferecidas pela clínica e facilitar o agendamento direcionado.

---

## 📅 Entidade **Consulta**
A entidade **Consulta** é o núcleo do sistema de agendamento. Os atributos definidos além do ID são:

- **data** – Data agendada para a consulta  
- **hora** – Horário agendado para a consulta 
- **descricaoSintomas** – Descrição detalhada dos sintomas relatados pelo paciente  
- **realizado** – Status booleano indicando se a consulta foi realizada (padrão: false)  
- **especialidade** – Especialidade médica relacionada à consulta  
- **paciente** – Paciente que agendou a consulta

Esses atributos foram escolhidos por cobrirem todas as informações necessárias para o agendamento, acompanhamento e histórico médico do paciente.

---

## ⚙️ Funcionalidades Principais (CRUD)
Operações básicas de CRUD, comuns aos três recursos (Paciente, Especialidade e Consulta):

- **findAll()** – Lista todos os registros cadastrados  
- **findById()** – Busca registros específicos por ID  
- **create()** – Cadastra um novo registro  
- **update()** – Atualiza os dados de um registro existente  
- **delete()** – Remove um registro do sistema (apenas Especialidade e Consulta)

---

## ⚙️ Funcionalidades Específicas de cada recurso
Métodos que atendem a necessidades específicas de cada recurso (lógica de negócio):

- **PacienteService.findByUsuario()** – Busca paciente por e-mail (usuário) para validação de login
- **ConsultaService.toggleStatus()** – Alterna o status de realização da consulta (realizado: true/false)
- **AuthService.validateUser()** – Valida credenciais do usuário comparando senhas criptografadas
- **AuthService.login()** – Gera token JWT para autenticação do paciente no sistema
- **Bcrypt.criptografarSenha()** – Criptografa senhas utilizando bcrypt com 10 saltos de segurança
- **Bcrypt.compararSenhas()** – Compara senha digitada com senha armazenada no banco de dados

---

# 🛠️ Tecnologias Utilizadas
### **Backend e Banco de Dados**
- **TypeScript** – Linguagem utilizada no desenvolvimento do backend, garantindo tipagem estática e melhor manutenção do código.  
- **TypeORM** – ORM utilizado para mapear entidades, gerenciar migrations e facilitar a comunicação com o banco de dados.  
- **NestJS** – Framework backend responsável pelos endpoints, controllers, services e modules.  
- **MySQL** – Banco de dados relacional usado para armazenar e organizar os registros de pacientes, especialidades e consultas.
- **Passport** – Middleware de autenticação utilizado para implementar estratégias Local e JWT.
- **JWT (JSON Web Token)** – Padrão de autenticação baseado em tokens para proteger rotas e validar sessões.
- **Bcrypt** – Biblioteca para criptografia de senhas com salt, garantindo segurança no armazenamento de credenciais.
- **Swagger** – Documentação interativa da API, permitindo testes e visualização de todos os endpoints disponíveis.

### **Ferramentas de Apoio**
- **Insomnia/Postman** – Ferramenta para testar as rotas da API, validar requisições e simular operações CRUD.
- **Git/GitHub** – Controle de versão e repositório para gerenciamento colaborativo do código-fonte.