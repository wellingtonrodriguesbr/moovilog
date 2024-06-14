# Moovilog

# RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível cadastrar uma empresa;
- [ ] Deve ser possível cadastrar membros para uma empresa;
- [ ] Deve ser possível cadastrar motoristas para uma empresa;
- [ ] Deve ser possível cadastrar dados bancários de um motorista;
- [ ] Deve ser possível cadastrar veículos;
- [ ] Deve ser possível cadastrar região de atendimento de uma empresa;
- [ ] Deve ser possível cadastrar as cidades atendidas de uma empresa;
- [ ] Deve ser possível cadastrar um frete;
- [ ] Deve ser possível obter informações de um frete específico;

# RNs (Regras de negócio)

- [x] Não deve ser possível cadastrar usuário com e-mail duplicado;s
- [x] Não deve ser possível cadastrar uma empresa com um CNPJ duplicado;
- [ ] Não deve ser possível cadastrar membros com e-mail duplicado;
- [x] Não deve ser possível cadastrar empresas com roles diferentes de ADMIN;

# RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
