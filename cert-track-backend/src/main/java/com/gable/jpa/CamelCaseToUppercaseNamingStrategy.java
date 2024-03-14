package com.gable.jpa;

import org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy;
import org.hibernate.boot.model.naming.Identifier;
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment;

public class CamelCaseToUppercaseNamingStrategy extends CamelCaseToUnderscoresNamingStrategy {

    private Identifier adjustName(final Identifier name) {
        if (name == null) {
            return null;
        }
        final String adjustedName = name.getText().toUpperCase();
        return new Identifier(adjustedName, true);
    }

    @Override
    public Identifier toPhysicalTableName(final Identifier name, final JdbcEnvironment context) {
        return adjustName(super.toPhysicalTableName(name, context));
    }

	@Override
	public Identifier toPhysicalColumnName(Identifier name, JdbcEnvironment context) {
		return  adjustName(super.toPhysicalColumnName(name, context));
	}
    
    

}
 