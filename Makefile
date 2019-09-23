include MakeCitron.Makefile


install-db: install-db-super ## install-db: Install zikoz database
	$(LOG)
	# psql -U postgres -c "DROP database zikoz" ||:
	psql -U postgres -c "CREATE USER zikoz" ||:
	psql -U postgres -c "CREATE database zikoz owner zikoz" ||:
	$(PIPENV) run flask create-db

insert-data:
	$(LOG)
	$(PIPENV) run flask insert-data
