# Moovilog

# RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível cadastrar uma empresa;
- [ ] Deve ser possível se autenticar como empresa;
- [ ] Deve ser possível cadastrar colaboradores para uma empresa;
- [ ] Deve ser possível cadastrar motoristas para uma empresa;
- [ ] Deve ser possível cadastrar dados bancários de um motorista;
- [ ] Deve ser possível se autenticar como motorista;
- [ ] Deve ser possível cadastrar veículos;
- [ ] Deve ser possível cadastrar região de atendimento de uma empresa;
- [ ] Deve ser possível cadastrar as cidades atendidas de uma empresa;
- [ ] Deve ser possível cadastrar um frete;
- [ ] Deve ser possível obter informações de um frete específico;

# RNs (Regras de negócio)

- [ ] Não deve ser possível cadastrar uma empresa com um CNPJ duplicado;
- [ ] Não deve ser possível cadastrar colaboradores com e-mail duplicados;

# RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
